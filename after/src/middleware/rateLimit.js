const e = require("express");

const buckets = new Map();

// default policy: 5 request per 60 seconds per IP
function rateLimit(options = {}) {
    const limit = options.limit ?? 5;
    const windowMs = options.windowMs ?? 60_000;

    return function rateLimitMiddleware(req, res, next) {
        const now = Date.now();

        // simple IP source; ok demo + local dev
        const ip = 
            req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
            req.socket.remoteAddress ||
            'unknown';

        const entry = buckets.get(ip) || { count: 0, resetAt: now + windowMs };

        // reset window if expired
        if (now > entry.resetAt) {
            entry.count = 0;
            entry.resetAt = now + windowMs;
        }

        entry.count += 1;
        buckets.set(ip, entry);

        if (entry.count > limit) {
            const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);

            res.setHeader('Retry-After', String(retryAfterSec));
            return res.status(429).json({
                ok: false,
                error: `Too many submissions. Please wait ${retryAfterSec}s and try again.`,
            });
        }

        next();
    };
}

// for testing purposes
function _resetRateLimitBuckets() {
    buckets.clear();
}

module.exports = { rateLimit, _resetRateLimitBuckets };
