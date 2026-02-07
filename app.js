// ============ GitHub Manager (API Integration) ============
class GitHubManager {
    constructor(token, owner, repo) {
        this.token = token;
        this.owner = owner;
        this.repo = repo;
        this.isAuthenticated = !!token;
    }

    async uploadDataToGitHub(records) {
        if (!this.isAuthenticated) return false;

        try {
            const timestamp = new Date().toISOString().split('T')[0];
            const filename = `data_backup_${timestamp}.json`;
            const content = JSON.stringify(records, null, 2);
            const encoded = btoa(unescape(encodeURIComponent(content)));

            const response = await fetch(
                `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${filename}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${this.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: `Auto-backup: ${records.length} records at ${new Date().toLocaleString('fa-IR')}`,
                        content: encoded,
                        branch: 'main'
                    })
                }
            );

            return response.ok;
        } catch (error) {
            console.error('GitHub upload error:', error);
            return false;
        }
    }
}

// ============ State Manager ============
class StateManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.idKey = `${storageKey}_id`;
        this.load();
    }

    load() {
        const stored = localStorage.getItem(this.storageKey);
        this.records = stored ? JSON.parse(stored) : [];
        this.currentId = parseInt(localStorage.getItem(this.idKey)) || 1;
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.records));
        localStorage.setItem(this.idKey, this.currentId.toString());
    }

    addRecord(record) {
        record.ID = this.currentId;
        this.records.push(record);
        this.currentId++;
        this.save();
        return record;
    }

    getRecords() {
        return this.records;
    }

    getRecordCount() {
        return this.records.length;
    }

    getCurrentRecordId() {
        return this.currentId;
    }

    exportCSV(headers) {
        if (this.records.length === 0) return null;

        let csvContent = headers.join('\t') + '\r\n';
        this.records.forEach((record, index) => {
            const row = [];
            headers.forEach(header => {
                const key = header.replace(/[\s-]/g, '_').toLowerCase();
                row.push(record[key] || '-');
            });
            csvContent += row.join('\t') + '\r\n';
        });

        return csvContent;
    }
}

// ============ Global Instances ============
let stateManager;
let githubManager;

// ============ Initialization ============
function initializeApp() {
    stateManager = new StateManager('cancer_form_records');
    
    // Try to load GitHub token from localStorage if available
    const githubToken = localStorage.getItem('github_token');
    if (githubToken) {
        githubManager = new GitHubManager(
            githubToken,
            'Hadiebrahimiseraji',
            'cancer'
        );
    }
}

// ============ Keyboard Shortcuts ============
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter: Submit form
        if (e.ctrlKey && e.key === 'Enter') {
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) submitBtn.click();
        }
        // Ctrl+R: Reset form
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            const resetBtn = document.getElementById('resetBtn');
            if (resetBtn) resetBtn.click();
        }
        // Ctrl+S: Save to GitHub
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            if (githubManager && githubManager.isAuthenticated) {
                uploadToGitHub();
            }
        }
    });
}

// ============ GitHub Upload Function ============
async function uploadToGitHub() {
    if (!githubManager || !githubManager.isAuthenticated) {
        alert('GitHub Token not configured');
        return;
    }

    const loading = document.createElement('div');
    loading.textContent = 'Uploading to GitHub...';
    loading.style.cssText = 'position:fixed;top:20px;right:20px;background:#2196f3;color:white;padding:15px 20px;border-radius:8px;z-index:999;';
    document.body.appendChild(loading);

    const success = await githubManager.uploadDataToGitHub(stateManager.getRecords());
    
    if (success) {
        loading.textContent = '✓ Uploaded to GitHub';
        loading.style.background = '#4caf50';
    } else {
        loading.textContent = '✗ Upload failed';
        loading.style.background = '#f44336';
    }

    setTimeout(() => loading.remove(), 3000);
}

// ============ Setup on Load ============
window.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupKeyboardShortcuts();
});
