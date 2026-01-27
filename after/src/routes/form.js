const express = require('express');
const { honeypot } = require('../middleware/honeypot');
const { timingTrap } = require('../middleware/timingTrap');
const { rateLimit } = require("../middleware/rateLimit");
const { validate } = require('../middleware/validate');
const { appendSubmission } = require('../services/storage');

const router = express.Router();

router.post('/', honeypot, timingTrap, rateLimit({ limit: 5, windowMs: 60_000 }), validate, (req, res) => {
    appendSubmission(req.body);
    res.json({ ok: true }); 
});

module.exports = { formRouter: router };

