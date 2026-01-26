const express = require('express');
const { validate } = require('../middleware/validate');

const router = express.Router();

router.post('/', validate, (req, res) => {
    // for now: just acknowledge cleaned payload
    res.json({ ok: true });
});

module.exports = { formRouter: router };

