const express = require('express');
const { validate } = require('../middleware/validate');
const { appendSubmission } = require('../services/storage');

const router = express.Router();

router.post('/', validate, (req, res) => {
    // IMPORTANT: backup first (prevents lead loss)
    appendSubmission(req.body);

    // later we will send email here
    res.json({ ok: true }); 
});

module.exports = { formRouter: router };

