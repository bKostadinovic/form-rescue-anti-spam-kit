const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());

// serve the frontend
app.use(express.static(path.join(__dirname, '..', '/public')));

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

// TEMP: basic form endpoint (we'll harden next)
app.post('/api/form', (req, res) => {
    // for now just echo back (no validation yet)
    res.json({ ok: true, received: req.body });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('After server running on port', PORT);
});