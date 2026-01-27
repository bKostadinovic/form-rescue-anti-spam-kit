// Basic input sanitanization utilities
// Intentionaly simple and explicit (no heavy deps)

function stripControlChars(value) {
    if (typeof value !== 'string') return '';
    // remove non-printable characters
    return value.replace(/[\x00-\x1F\x7F]/g, '');
}

function escapeHtml(value) {
    if (typeof value !== 'string') return '';
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sanitizeText(value) {
    if (typeof value !== 'string') return '';
    let v = value.trim();
    v = stripControlChars(v);
    v = escapeHtml(v);
    return v;
}

module.exports = {
    sanitizeText,
    stripControlChars,
    escapeHtml,
};
