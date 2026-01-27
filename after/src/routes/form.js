const express = require('express');
const { honeypot } = require('../middleware/honeypot');
const { timingTrap } = require('../middleware/timingTrap');
const { validate } = require('../middleware/validate');
const { appendSubmission } = require('../services/storage');

const router = express.Router();

router.post('/', honeypot, timingTrap,validate, (req, res) => {
    appendSubmission(req.body);
    res.json({ ok: true }); 
});

module.exports = { formRouter: router };

