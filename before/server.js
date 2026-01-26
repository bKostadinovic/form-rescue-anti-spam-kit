// super basic server for the form
// NOTE: this is the "broken baseline" version on purpose

const express = require('express');

const app = express();
app.use(express.json());

// allow browser to call this from a local html file
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.post('/submit', (req, res) => {
    // accepts literally anything
    console.log('NEW SUBMISSION:', req.body);

    // simulate "sometimes it fails" like real world cheap hosting / plugin issues
    // about 1 out of 5 requests fails
    const shouldFail = Math.random() < 0.2;

    if (shouldFail) {
        console.log('Simulated failure sending email...');
        return res.status(500).json({ ok: false, error: 'mail failed' });
    }

    // pretend email sent
    res.json({ ok: true });
});

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log('Broken baseline server running on port', PORT);
});