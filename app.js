/**
 * GitHub API Handler
 * Manages data persistence to GitHub repository
 */

class GitHubManager {
  constructor(config) {
    this.config = config;
    this.isAuthenticated = !!config.GITHUB_TOKEN;
  }

  /**
   * Get file content from GitHub
   */
  async getFileContent(path) {
    if (!this.isAuthenticated) {
      console.warn('Not authenticated. Using local storage.');
      return null;
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${this.config.GITHUB_OWNER}/${this.config.GITHUB_REPO}/contents/${path}`,
        {
          headers: {
            'Authorization': `token ${this.config.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+raw'
          }
        }
      );

      if (response.status === 404) {
        return null; // File doesn't exist
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      console.error('Error fetching file:', error);
      return null;
    }
  }

  /**
   * Get file SHA (needed for updates)
   */
  async getFileSHA(path) {
    if (!this.isAuthenticated) return null;

    try {
      const response = await fetch(
        `https://api.github.com/repos/${this.config.GITHUB_OWNER}/${this.config.GITHUB_REPO}/contents/${path}`,
        {
          headers: {
            'Authorization': `token ${this.config.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (response.status === 404) {
        return null;
      }

      const data = await response.json();
      return data.sha;
    } catch (error) {
      console.error('Error getting file SHA:', error);
      return null;
    }
  }

  /**
   * Save or update file in GitHub
   */
  async saveFile(path, content, message) {
    if (!this.isAuthenticated) {
      console.error('Not authenticated. Cannot save to GitHub.');
      return false;
    }

    try {
      const sha = await this.getFileSHA(path);
      const encodedContent = btoa(unescape(encodeURIComponent(content)));

      const payload = {
        message: message,
        content: encodedContent,
        branch: this.config.GITHUB_BRANCH
      };

      if (sha) {
        payload.sha = sha;
      }

      const response = await fetch(
        `https://api.github.com/repos/${this.config.GITHUB_OWNER}/${this.config.GITHUB_REPO}/contents/${path}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${this.config.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      console.error('Error saving file:', error);
      return false;
    }
  }

  /**
   * Append row to CSV
   */
  async appendToCSV(rowData, headers) {
    let csvContent = await this.getFileContent(this.config.DATA_FILE_PATH);

    if (!csvContent) {
      // Create new file with headers
      const headerRow = headers.join(',') + '\n';
      csvContent = headerRow;
    }

    // Convert row data to CSV format
    const row = headers.map(header => {
      let value = rowData[header] || '-';
      // Escape quotes and wrap in quotes if contains comma
      if (typeof value === 'string') {
        value = value.replace(/"/g, '""');
        if (value.includes(',') || value.includes('\n')) {
          value = `"${value}"`;
        }
      }
      return value;
    }).join(',') + '\n';

    csvContent += row;

    const message = `افزودن رکورد جدید: ${rowData['کد_شناسایی']} - ${rowData['تاریخ']}`;
    return await this.saveFile(this.config.DATA_FILE_PATH, csvContent, message);
  }
}

/**
 * Application State Manager
 */
class StateManager {
  constructor() {
    this.records = [];
    this.currentRecordId = 1;
    this.loadFromStorage();
  }

  loadFromStorage() {
    const stored = localStorage.getItem('cancer_questionnaire_records');
    if (stored) {
      try {
        this.records = JSON.parse(stored);
        this.currentRecordId = parseInt(localStorage.getItem('cancer_current_id')) || (this.records.length + 1);
      } catch (e) {
        console.warn('Failed to load from storage', e);
      }
    }
  }

  saveToStorage() {
    localStorage.setItem('cancer_questionnaire_records', JSON.stringify(this.records));
    localStorage.setItem('cancer_current_id', this.currentRecordId);
  }

  addRecord(record) {
    record.ID = this.currentRecordId;
    this.records.push(record);
    this.currentRecordId++;
    this.saveToStorage();
    return record;
  }

  getRecords() {
    return this.records;
  }

  getCurrentRecordId() {
    return this.currentRecordId;
  }

  getRecordCount() {
    return this.records.length;
  }
}

// Initialize managers globally
let stateManager = new StateManager();
let githubManager = null;

// Initialize GitHub manager when token is available
function initGitHubManager() {
  if (typeof GITHUB_CONFIG !== 'undefined') {
    githubManager = new GitHubManager(GITHUB_CONFIG);
    if (githubManager.isAuthenticated) {
      console.log('✓ GitHub manager initialized');
    } else {
      console.log('ℹ️ Using local storage only (GitHub token not set)');
    }
  }
}

// Call on script load
window.addEventListener('DOMContentLoaded', () => {
  initGitHubManager();
});
