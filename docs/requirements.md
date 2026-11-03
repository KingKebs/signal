# Requirements Specification

This document extracts and consolidates the core requirements from the Product & Technical Build Specification for Signal.

## 1. Functional Scope

### 1.1 Web Application (Public Marketing Site)
*   **Pages Required:** Home (`/`), Platform (`/platform`), Solutions (`/solutions`), Pricing (`/pricing`), Contact (`/contact`), Login (`/login`).
*   **Navigation:** Public navigation distinct from authenticated app navigation.
*   **Contact Form:** Accessible form capturing legitimate enquiries with validation, consent/privacy notice, and secure server-side handling.

### 1.2 Web Application (Dashboard / Protected App)
*   **Pages Required:** Application entry (`/app`), Lead Queue/List, Lead Detail.
*   **Minimum Dashboard Widgets:**
    *   Total new leads in selected period.
    *   Leads awaiting follow-up.
    *   Qualified leads and conversion outcomes.
    *   Recent activity / latest submissions.
    *   Follow-up queue with status, priority, and next action.

### 1.3 Core MVP Workflow (Backend & Persistence)
*   **Capture:** Accept a lead via the contact form.
*   **Store:** Validate and persist the lead (source, created time, status, consent metadata).
*   **Prioritize:** Assign a transparent, rule-based priority score based on lead attributes. Persist the score explanation.
*   **Follow Up:** Allow an authorized user to assign an owner, set a next action, and update the lead status.
*   **Measure:** Retrieve counts by status, outstanding follow-ups, and outcomes.

## 2. Non-Functional Requirements

### 2.1 UI/UX & Accessibility
*   **Theme:** Premium, modern, technology-led (Deep navy/charcoal, Electric teal/cyan).
*   **Responsiveness:** Mobile-first layout (testing at 360px, 390px, 768px, 1024px, 1440px).
*   **Accessibility Baseline:** Target WCAG 2.2 AA. Semantic HTML, logical headings, keyboard navigation, visible focus states, sufficient contrast.

### 2.2 Architecture & Infrastructure
*   **Paradigm:** Modular monolith.
*   **Local Development:** Full stack runnable via Docker Compose (`docker compose up --build -d`).
*   **Data Persistence:** PostgreSQL with named Docker volumes for local development. Database migrations act as the single source of truth.
*   **Timestamps:** Stored strictly in UTC.

### 2.3 Privacy & Security
*   **Privacy by Design:** Collect only disclosed, authorized first-party data. No covert fingerprinting.
*   **Tenant Isolation:** Secure tenant boundaries must be enforced server-side.
*   **Input Validation:** Enforced strictly at the API boundary.
*   **Secrets:** Never commit secrets to version control. Use `.env` files.
*   **Abuse Prevention:** Rate limiting and abuse controls on public forms.