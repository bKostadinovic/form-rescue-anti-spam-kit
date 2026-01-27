const { log } = require("../utils/logger");

const MAIL_MODE = process.env.MAIL_MODE || 'dev';
// dev | stmp

async function sendMail({ name, email, message }) {
    if (MAIL_MODE === 'dev') {
        // simulate email sending in development
        log ('info', 'email(dev)', {
            to: 'site-owner@example.com',
            from: email,
            subject: `New contact form message from ${name}`,
            preview: message.slice(0, 80),
        });

        return { ok: true, mode: 'dev' };
    }

    if (MAIL_MODE === 'smtp') {
        // placeholder for real SMTP (intentinally not wired here)
        // Example: nodemailer, SES, Mailgun, etc.

        try {
            // send email here
            log('info', 'email(smtp) sent', { error: err.message });
            return { ok: true, mode: 'smtp' };
        } catch (err) {
            log('error', 'email(smtp) failed', { error: err.message });
            return { ok: false, error: "Email delivery failed" };
        }
}

    log('warn', 'unknown mail mode', { MAIL_MODE });
    return { ok: false, error: "Invalid mail mode" };
}

module.exports = {
    sendMail,
};

