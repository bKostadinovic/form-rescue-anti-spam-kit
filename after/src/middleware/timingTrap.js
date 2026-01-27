function timingTrap(req, res, next) {
    const ts = req.body?._ts;

    // missing timestamp -> suspicious
    if (typeof ts !== 'number') {
        return res.status(200).json({ ok: true });
    }

    const elapsedMs = Date.now() - ts;

    // bots submit instatly; humas don't
    if (elapsedMs < 1500) {
        return res.status(200).json({ ok: true });
    }

    next();
}

module.exports = { timingTrap };