const express = require('express');
const { honeypot } = require('../middleware/honeypot');
const { validate } = require('../middleware/validate');
const { appendSubmission } = require('../services/storage');

const router = express.Router();

router.post('/', honeypot, validate, (req, res) => {
    appendSubmission(req.body);
    res.json({ ok: true }); 
});

module.exports = { formRouter: router };

