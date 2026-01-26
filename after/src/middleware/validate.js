function isEmailLike(value) {
    if (typeof value !== 'string') return false;
    const v = value.trim();
    if (v.length < 5 || v.length > 254) return false;
    // practical email check (good enough for most cases)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function cleanString(value) {
    if (typeof value !== 'string') return '';
    return value.trim();
}

function validate(req, res, next) {
    const name = cleanString(req.body?.name);
    const email = cleanString(req.body?.email);
    const message = cleanString(req.body?.message);

    const errors = {};

    if (!name) errors.name = 'Name is required.';
    if (!email) errors.email = 'Email is required.';
    else if (!isEmailLike(email)) errors.email = 'Please enter a valid email address.';

    if (!message) errors.message = 'Message is required.';
    else if (message.length > 1000) errors.message = 'Message is too long (max 1000 characters).';

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ 
            ok: false,
            error: "Please fix the highlighted fields.",
            fields: errors, 
        });
    }

    // attach cleaned payload for later middleware/services
    req.form = { name, email, message };
    next();
}

module.exports = { validate };