const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const FILE_PATH = path.join(DATA_DIR, 'submissions.ndjson');

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function appendSubmission(submission) {
    ensureDataDir();

    const row = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        ts: new Date().toISOString(),
        name: submission.name,
        email: submission.email,
        message: submission.message,
    };

    fs.appendFileSync(FILE_PATH, JSON.stringify(row) + '\n', 'utf8');
    return row;
}

function readAllSubmissions() {
    ensureDataDir();
    if (!fs.existsSync(FILE_PATH)) return [];
    const text = fs.readFileSync(FILE_PATH, 'utf8');
    if (!text.trim()) return [];
    return text.trim().split('\n').map(line => JSON.parse(line));
}

module.exports = {
    appendSubmission,
    readAllSubmissions,
    FILE_PATH,
};

