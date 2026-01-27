const { rateLimit, _resetRateLimitBuckets } = require("../src/middleware/rateLimit");

function mockRes() {
    return {
        code: null,
        headers: {},
        body: null,
        setHeader(key, value) {
            this.headers[key] = value;
        },
        status(c) {
            this.code = c;
            return this;
        },
        json(body) {
            this.body = body;
            return this;
        },
    };
}

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function run() {
    _resetRateLimitBuckets();

    const mw = rateLimit({ limit: 2, windowMs: 60_000 });

    const req = {
        headers: {},
        socket: { remoteAddress: '1.2.3.4' },
    };

    // 1st should pass
    let nextCalled = false;
    mw(req, mockRes(), () => (nextCalled = true));
    assert(nextCalled === true, 'Expected 1st request to pass');

    // 2nd should pass
    nextCalled = false;
    mw(req, mockRes(), () => (nextCalled = true));
    assert(nextCalled === true, 'Expected 2nd request to pass');

    // 3rd should be blocked
    const res = mockRes();
    nextCalled = false;
    mw(req, res, () => (nextCalled = true));
    assert(nextCalled === false, 'Expected 3rd request to be blocked');
    assert(res.code === 429, 'Expected 3rd request to return 429 status');
    assert(res.body && res.body.ok == false, 'Expected ok: false');
    assert(typeof res.headers['Retry-After'] !== 'undefined', 'Expected Retry-After header');

    console.log('rateLimit.test.js OK');
}

run();