const { validate } = require('../src/middleware/validate');

function mockRes() {
    return {
        code: null,
        body: null,
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
    // 1) empty payload -> 400 with field errors
    {
        const req = { body: {} };
        const res = mockRes();
        let nextCalled = false;

        validate(req, res, () => (nextCalled = true));

        assert(nextCalled === false, 'Expected next() NOT called on empty payload');
        assert(res.code === 400, 'Expected 400 status on empty payload');
        assert(res.body && res.body.ok === false, 'Expected ok: false');
        assert(res.body.fields, 'Expected fields object');
        assert(res.body.fields.name, 'Expected name error');
        assert(res.body.fields.email, 'Expected email error');
        assert(res.body.fields.message, 'Expected message error');
    }

    // 2) invalid email -> 400
    {
        const req = { body: { name: 'A', email: 'aaa', message: 'Hi' } };
        const res = mockRes();
        let nextCalled = false;

        validate(req, res, () => (nextCalled = true));

        assert(nextCalled === false, 'Expected next() NOT called on invalid email');
        assert(res.code === 400, 'Expected 400 status on invalid email');
        assert(res.body.fields && res.body.fields.email, 'Expected email field error');
    }

    // 3) message too long -> 400
    {
        const longMsg = 'x'.repeat(1001);
        const req = { body: { name: 'A', email: 'a@a.com', message: longMsg } };
        const res = mockRes();
        let nextCalled = false;

        validate(req, res, () => (nextCalled = true));

        assert(nextCalled === false, 'Expected next() NOT called on long message');
        assert(res.code === 400, 'Expected 400 status on long message');
        assert(res.body.fields && res.body.fields.message, 'Expected message field error');
    }

    // 4) valid payload -> next() called and req.form cleaned
    {
        const req = {
            body: {
                name: ' John ',
                email: ' john@example.com',
                message: ' hello ',
            },
        };
        const res = mockRes();
        let nextCalled = false;

        validate(req, res, () => (nextCalled = true));

        assert(nextCalled === true, 'Expected next() called on valid payload');
        assert(req.form, 'Expected req.form to be set');
        assert(req.form.name === 'John', 'Expected trimmed name');
        assert(req.form.email === 'john@example.com', 'Expected trimmed email');
        assert(req.form.message === 'hello', 'Expected trimmed message');
    }

    console.log('validate.test.js OK');
}

run();