# Form Rescue & Anti-Spam Kit (Before → After)

**Problem**  
A business contact form stopped reliably delivering messages after updates.  
At the same time, spam submissions flooded the inbox — causing lost leads and wasted time.

**What I did**  
I diagnosed the failure points, stabilized the submission flow, blocked spam at multiple layers, and ensured every valid lead is safely stored even if email delivery fails.

**Result**  
- Reliable form submissions  
- Spam reduced to near zero  
- No lead loss (all submissions backed up)  
- Clear verification checklist for non-technical handoff

---

## What this repository shows

This repository demonstrates how I **rescue, harden, and document** a broken production form without rebuilding the site or adding SaaS dependencies.

- `before/` — intentionally broken baseline with documented issues  
- `after/` — hardened, tested implementation  
- `docs/` — case study, threat model, and verification checklist  

This mirrors real client rescue work.

---

## Key fixes delivered

- Submission validation and safe error handling  
- Layered anti-spam protection:
  - Honeypot field
  - Timing-based bot detection
  - Rate limiting
- Reliable email delivery via SMTP
- Lead backup (append-only storage + CSV export)
- Clear success and failure states for users
- Tests covering validation, spam protection, and storage

---

## How to run locally

### Broken version (for comparison)

```bash
cd before
node server.js
open index.html
```

### Fixed version

```bash
cd after
npm install
cp .env.example .env
npm test
npm run dev
open http://localhost:3000
```
---

## Who this is for

This project reflects work I do for:
- Non-technical founders
- Shopify / WordPress site owners
- Teams with broken or unreliable forms
- Projects affected by plugin or hosting changes

If your form “mostly works” but loses leads or attracts spam, this is the type of fix I deliver.