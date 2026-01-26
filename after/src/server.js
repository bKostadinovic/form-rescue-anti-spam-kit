const path = require('path');
const express = require('express');
const { formRouter } = require('./routes/form');

const app = express();

app.use(express.json());

// serve the frontend
app.use(express.static(path.join(__dirname, '..', '/public')));

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

app.use('/api/form', formRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('After server running on port', PORT);
});