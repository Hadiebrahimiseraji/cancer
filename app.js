// ============================================
// GitHub API Manager + State Manager
// Version: 2.0
// Purpose: Automatic backup to GitHub + Local Storage Management
// ============================================

class GitHubManager {
    constructor() {
        this.owner = 'Hadiebrahimiseraji';
        this.repo = 'cancer';
        this.branch = 'main';
        this.token = this.loadToken();
        this.isConnected = !!this.token;
    }

    // Load token from localStorage
    loadToken() {
        return localStorage.getItem('github_token');
    }

    // Save token to localStorage
    saveToken(token) {
        localStorage.setItem('github_token', token);
        this.token = token;
        this.isConnected = true;
        this.updateStatus();
    }

    // Remove token
    removeToken() {
        localStorage.removeItem('github_token');
        this.token = null;
        this.isConnected = false;
        this.updateStatus();
    }

    // Update UI status
    updateStatus() {
        const statusEl = document.getElementById('githubStatus');
        if (!statusEl) return;

        if (this.isConnected) {
            statusEl.className = 'github-status connected';
            statusEl.innerHTML = '✅ GitHub متصل';
        } else {
            statusEl.className = 'github-status local';
            statusEl.innerHTML = '📦 حالت محلی';
        }
    }

    // Get file SHA (needed for updates)
    async getFileSHA(path) {
        try {
            const response = await fetch(
                `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                return data.sha;
            }
            return null;
        } catch (error) {
            console.error('Error getting file SHA:', error);
            return null;
        }
    }

    // Upload data to GitHub
    async uploadToGitHub(data, filename = null) {
        if (!this.isConnected) {
            throw new Error('GitHub token not configured');
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const path = filename || `data/backup_${timestamp}.json`;
        
        // Get existing file SHA if it exists
        const sha = await this.getFileSHA(path);

        // Prepare content
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));

        // Create commit message
        const message = `Auto backup: ${new Date().toLocaleString('fa-IR')} - ${data.length} records`;

        // API request
        const body = {
            message: message,
            content: content,
            branch: this.branch
        };

        if (sha) {
            body.sha = sha;
        }

        try {
            const response = await fetch(
                `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Upload failed');
            }

            const result = await response.json();
            return {
                success: true,
                url: result.content.html_url,
                path: path
            };
        } catch (error) {
            console.error('GitHub upload error:', error);
            throw error;
        }
    }

    // Auto-save to GitHub on every record save
    async autoBackup(records) {
        if (!this.isConnected) return;

        try {
            await this.uploadToGitHub(records, 'data/latest_backup.json');
            console.log('✅ Auto-backup successful');
        } catch (error) {
            console.warn('⚠️ Auto-backup failed:', error.message);
        }
    }
}

// ============================================
// State Manager
// ============================================

class StateManager {
    constructor() {
        this.STORAGE_KEY = 'cancer_form_records';
        this.STORAGE_ID_KEY = 'cancer_form_id';
        this.records = this.loadRecords();
        this.currentId = this.loadCurrentId();
    }

    // Load records from localStorage
    loadRecords() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    // Load current ID
    loadCurrentId() {
        const stored = localStorage.getItem(this.STORAGE_ID_KEY);
        return stored ? parseInt(stored) : 1;
    }

    // Save records to localStorage
    saveRecords() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.records));
        localStorage.setItem(this.STORAGE_ID_KEY, this.currentId.toString());
    }

    // Add new record
    addRecord(record) {
        record.ID = this.currentId;
        record.timestamp = new Date().toLocaleString('fa-IR');
        this.records.push(record);
        this.currentId++;
        this.saveRecords();
        return record;
    }

    // Get all records
    getAllRecords() {
        return this.records;
    }

    // Clear all records
    clearRecords() {
        this.records = [];
        this.currentId = 1;
        this.saveRecords();
    }

    // Get record count
    getRecordCount() {
        return this.records.length;
    }
}

// ============================================
// Global instances
// ============================================

const githubManager = new GitHubManager();
const stateManager = new StateManager();

// ============================================
// Utility Functions
// ============================================

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        font-weight: bold;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// GitHub token setup dialog
function showTokenDialog() {
    const dialog = document.createElement('div');
    dialog.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        direction: rtl;
    `;

    dialog.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 12px; max-width: 500px; width: 90%;">
            <h3 style="margin-bottom: 15px; color: #333;">🔐 تنظیم GitHub Token</h3>
            <p style="margin-bottom: 15px; color: #666; font-size: 0.95em;">
                برای فعال‌سازی بکاپ خودکار، توکن GitHub خود را وارد کنید.
            </p>
            <input type="password" id="tokenInput" placeholder="github_pat_..." 
                   style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; margin-bottom: 15px; font-size: 0.9em;">
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button id="tokenCancel" style="padding: 10px 20px; border: none; background: #f5f5f5; border-radius: 8px; cursor: pointer;">
                    انصراف
                </button>
                <button id="tokenSave" style="padding: 10px 20px; border: none; background: #4caf50; color: white; border-radius: 8px; cursor: pointer;">
                    ذخیره
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(dialog);

    document.getElementById('tokenCancel').addEventListener('click', () => dialog.remove());
    document.getElementById('tokenSave').addEventListener('click', () => {
        const token = document.getElementById('tokenInput').value.trim();
        if (token) {
            githubManager.saveToken(token);
            showNotification('✅ توکن ذخیره شد');
            dialog.remove();
        } else {
            showNotification('❌ توکن نامعتبر است', 'error');
        }
    });
}

// ============================================
// Export functions for external use
// ============================================

window.githubManager = githubManager;
window.stateManager = stateManager;
window.showNotification = showNotification;
window.showTokenDialog = showTokenDialog;

// ============================================
// Auto-initialization
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    githubManager.updateStatus();
    
    // Add keyboard shortcut for GitHub upload (Ctrl+S)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            if (githubManager.isConnected) {
                const records = stateManager.getAllRecords();
                githubManager.uploadToGitHub(records)
                    .then(() => showNotification('✅ آپلود به GitHub موفق بود'))
                    .catch(err => showNotification(`❌ خطا: ${err.message}`, 'error'));
            } else {
                showTokenDialog();
            }
        }
    });

    console.log('✅ GitHub Manager initialized');
    console.log('📊 Records loaded:', stateManager.getRecordCount());
});
