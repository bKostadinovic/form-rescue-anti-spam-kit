# Before: Broken Contact Form Baseline

This folder contains the **intentionally broken version** of the form
that represents a real client problem.

This is NOT the final solution — it shows the issues clients often bring
me when their forms stop working after updates, plugin changes, or
deployment issues.

---

## What this version does

- Renders a simple contact/signup form
- Sends a request to the server without any spam protection
- Submits every request regardless of content or timing
- Does not back up submissions
- Handles success and error states poorly

---

## Known Issues

These are reproducible and documented to show the pain points:

1. **Form doesn’t reliably send**
   - After certain updates, form submissions never reach the inbox
   - No retry or error feedback is provided

2. **Spam submissions flood the inbox**
   - No anti-spam protection (no honeypot, no rate limiting)
   - Bots easily submit many fake leads per minute

3. **Duplicate submissions**
   - Rapid clicks on the submit button generate multiple requests
   - Leads get duplicated in backend systems

4. **No lead backup**
   - Failed submissions are lost forever
   - No storage or export mechanism

5. **Poor error handling**
   - Users see generic errors or no message at all
   - Clients don’t know when something has failed

---

## How to run this broken version

Run the server:
```bash
cd before
node server.js
open index.html
```