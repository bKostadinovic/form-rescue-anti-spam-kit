function nowIso() {
    return new Date().toISOString();
}

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};

function getLevel() {
    const raw = (process.env.LOG_LEVEL || 'info').toLowerCase();
    return levels[raw] ?? levels.info;
}

function log(level, message, meta) {
    const current = getLevel();
    const lvl = levels[level] ?? levels.info;

    if (lvl > current) return;

    const base = `[${nowIso()}] [${level.toUpperCase()}] ${message}`;

    if (meta && typeof meta === 'object') {
        // keep meta compact + safe (no huge dumps)
        const safe = JSON.stringify(meta);
        console.log(base + ' ' + safe);
        return;
    }

    console.log(base);
}

function requestLogger() {
    return function (req, res, next) {
        const start = Date.now();

        res.on('finish', () => {
            const ms = Date.now() - start;

            log ('info', 'request', {
                method: req.method,
                path: req.originalUrl || req.url,
                status: res.statusCode,
                ms,
            });
        });

        next();
    };
}

module.exports = {
    log,
    requestLogger,
};
            