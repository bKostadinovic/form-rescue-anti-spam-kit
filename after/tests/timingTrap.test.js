const { timingTrap } = require('../src/middleware/timingTrap');

function mockRes() {
    return {
        code: null,
        status(c) {
            this.code = c;
            return this;
        },
        json() {
            return this;
    }
  };
}

function assert(condition, message) {
    if (!condition) throw new Error(message);
}
function run() {
    // fast bot submission (100ms)
    let nextCalled = false;
    timingTrap(
        { body: { _ts: Date.now() - 100 } },
        mockRes(),
        () => { nextCalled = true; }
    );
    assert(nextCalled === false, 'Expected bot-fast submit to be blocked');

    // human submission (3 seconds)
    nextCalled = false;
    timingTrap(
        { body: { _ts: Date.now() - 3000 } },
        mockRes(),
        () => { nextCalled = true; }
    );
    assert(nextCalled === true, 'Expected human submit to pass');

    console.log('timingTrap.test.js OK');
}

run();