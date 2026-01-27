# Verification Checklist — Form Rescue & Anti-Spam Kit

### This checklist is intentionally simple and does not require technical knowledge.
### This checklist is designed so a non-technical site owner can verify that the contact form is working correctly and safely after deployment.
### You can go through it top to bottom in 5–10 minutes.

## 1. Basic form functionality

- [ ] Form loads correctly in the browser
- [ ] Name, email, and message fields are visible
- [ ] Submit button is clickable
- [ ] Submitting valid data shows a success message
- [ ] Page does not reload on submit

## 2. Validation (user mistakes)

- [ ] Submitting with empty fields shows clear error messages
- [ ] Invalid email format is rejected
- [ ] Extremely long messages are rejected
- [ ] Errors are specific (not generic “something went wrong”)

## 3. Spam protection

Honeypot (hidden bot field)

- [ ] Normal users can submit the form successfully
- [ ] Automated submissions are silently ignored
- [ ] Spam submissions do not appear in stored leads

Timing protection

- [ ] Submitting the form instantly (under ~1 second) is blocked
- [ ] Normal human submissions work without issues

Rate limiting

- [ ] Multiple rapid submissions from the same source are blocked
- [ ] Server responds with a clear “too many submissions” message
- [ ] Spam bursts do not overload the system

## 4. Lead safety (no data loss)

- [ ] Every valid submission is saved immediately
- [ ] Leads are stored even if email delivery fails
- [ ] Stored leads can be exported to CSV
- [ ] No duplicate submissions from double-clicking

## 5. Email delivery (development mode)

- [ ] Form submission triggers an email log in the server console
- [ ] Email sending does not block form success
- [ ] Temporary email issues do not affect lead storage

 Note: Production SMTP can be enabled later without code changes.

## 6. Observability & diagnostics

- [ ] Each request is logged with method, path, status, and timing
- [ ] Errors are visible in server logs
- [ ] No sensitive data is printed to logs

## 7. Health & uptime check

- [ ] /health endpoint responds with { ok: true }
- [ ] Server starts without errors
- [ ] Application runs without crashes during normal usage

# Verification complete

### If all items above are checked, the form is:

 - Stable
 - Spam-resistant
 - Safe against lead loss
 - Ready for production use