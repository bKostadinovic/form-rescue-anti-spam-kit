function honeypot(req, res, next) {
    const hp = req.body?.company;

    // if bot filled it, quietly reject
    if (typeof hp === 'string' && hp.trim().length > 0) {
        return res.status(200).json({ ok: true });
    }

    next();
}

module.exports = { honeypot };

