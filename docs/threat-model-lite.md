# Threat Model (Lite) — Form Rescue & Anti-Spam Kit

This document outlines the realistic threats affecting public contact forms and how this project mitigates them.
It is intentionally lightweight and practical, not a formal security audit.

## Scope

This threat model applies to:

 * Public contact / inquiry forms
 * Anonymous internet users
 * Small to medium business websites
 * No authenticated users

Out of scope:

 * Account takeover
 * Payment processing
 * Sensitive personal data storage

## Identified Threats & Mitigations

### 1. Automated spam submissions

### Threat:
    Bots submit large volumes of fake messages, flooding inboxes and storage.

### Mitigations:

   * Honeypot field to trap automated bots
   * Timing-based detection to block instant submissions
   * IP-based rate limiting to stop submission bursts

### 2. Lost leads due to email failure

### Threat:
    Email delivery fails due to hosting, SMTP, or provider issues, causing permanent lead loss.

### Mitigations:

   * Lead data is stored immediately before email sending
   * Email delivery is non-blocking
   * CSV export allows manual recovery of leads

### 3. Duplicate submissions

### Threat:
    Users double-click submit or refresh during submission, creating duplicate leads.

### Mitigations:

   * Validation and request handling prevent duplicate storage
   * Rate limiting reduces rapid repeat submissions

### 4. Malformed or abusive input

### Threat:
    Attackers submit extremely long, malformed, or malicious input.

### Mitigations:

   * Input validation with clear limits
   * Basic input sanitization
   * Rejection of invalid email formats
   * Maximum message length enforced

### 5. Silent failures (no visibility)

### Threat:
    Form appears to work, but submissions fail silently with no diagnostics.

### Mitigations:

   * Request logging with timing and status
   * Clear error responses for validation and rate limits
   * Health endpoint for uptime checks

## Residual Risk

This system is designed to:

   * Reduce spam to near zero
   * Prevent lead loss
   * Provide visibility into failures

It does not aim to:

   * Stop targeted attacks by skilled adversaries
   * Replace enterprise-grade security solutions

This tradeoff is intentional and appropriate for the problem domain.

## Summary

With layered defenses and explicit failure handling, the form is:

   * Resistant to common abuse
   * Safe against accidental lead loss
   * Observable and diagnosable

Suitable for production use in typical business environments