const { honeypot } = require('../src/middleware/honeypot');

function mockRes() {
    return {
        code: null,
        body: null,
        status(c) {
            this.code = c;
            return this;
        },
        json(b) {
            this.body = b;
            return this;
        },
    };
}

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function run() {
    // case 1: empty honeypot -> shoyld call next
    let nextCalled = false;
    honeypot ({ body : { company: '' } }, mockRes(), () => { nextCalled = true; });
    assert(nextCalled, 'Expected next to be called for empty honeypot');

    // case 2: filled honeypot -> should short-circuit with ok: true
    const res = mockRes();
    nextCalled = false;
    honeypot ({ body : { company: 'spam corp' } }, res, () => { nextCalled = true; });

    assert(nextCalled === false, 'Expected next NOT to be called for filled honeypot');
    assert(res.code === 200, 'Expected status code 200 for filled honeypot');
    assert(res.body && res.body.ok === true, 'Expected body to be { ok: true } for filled honeypot');

    console.log('honeypot.test.js OK');
}

run();