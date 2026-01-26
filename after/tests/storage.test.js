const fs = require('fs');
const { appendSubmission, readAllSubmissions, FILE_PATH } = require('../src/services/storage');

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function run() {
    // backup existing file if it exists
    let backup = null;
    if (fs.existsSync(FILE_PATH)) {
        backup = fs.readFileSync(FILE_PATH, 'utf8');
        fs.writeFileSync(FILE_PATH, '', 'utf8');
    }

    appendSubmission({ name: 'Test', email: 'test@test.com', message: 'Hello' });
    const all = readAllSubmissions();

    assert(all.length === 1, 'Expected 1 stored submission');
    assert(all[0].email === 'test@test.com', 'Email should match stored value');

    // restore file
    if (backup !== null) fs.writeFileSync(FILE_PATH, backup, 'utf8');

    console.log('storage.test.js OK');
}

run();
