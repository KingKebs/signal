# SIGNAL

# Product & Technical Build Specification

A phased implementation brief for the Antigravity coding agent

## PRODUCT DIRECTION
 intelligence for businesses: capture legitimate enquiries, prioritise opportunities and automate timely sales follow-up.

### Build approach
*   **Documentation and architecture first:** README, HLD and LLD must exist before application development begins.
*   **Build a small, working core** before adding advanced intelligence or integrations.
*   **Run the full stack locally** with Docker Compose and provide repeatable test instructions.
*   **Complete each phase** against its acceptance criteria before proceeding.

Version 1.0 | Prepared 4 November 2026 | Status: Initial implementation brief

---

## 1. Purpose and product vision
This document defines the initial product scope, design system, functional requirements, phased delivery plan, technical expectations and quality gates for Signal. It is intended to be supplied to an autonomous coding agent operating in the Antigravity development environment.

### Product vision
Signal helps businesses make better use of the enquiries and first-party activity they are authorised to process. It brings lead capture, prioritisation, sales follow-up and outcome reporting into one clear workflow.

### Product promise
**Turn missed opportunities into measurable revenue.** Help teams understand which known leads need attention, what action to take next and whether that action led to a commercial outcome.

### Product principles
*   **Useful before sophisticated:** ship a reliable lead workflow before attempting complex identity resolution or predictive AI.
*   **Privacy by design:** use appropriately disclosed, authorised first-party data; do not attempt covert identification of anonymous individuals.
*   **Evidence over vanity metrics:** report leads, response times, follow-ups and outcomes rather than inflated traffic metrics.
*   **Progressive complexity:** keep the first release small, modular and extensible.
*   **Accessible by default:** responsive layouts, keyboard access, readable contrast and clear form feedback.

### Non-goals for the first release
*   No universal person-identification network or purchased personal-data marketplace.
*   No complex predictive AI, multi-touch attribution or marketing automation suite in the MVP.
*   No large catalogue of CRM integrations; implement one integration boundary and one initial connector only if validated.
*   No native iOS or Android application. The first release is a responsive web application.

---

## 2. Initial functional pages and navigation
Start with a deliberately small set of pages. The first milestone is a working, navigable website and application shell—not every future platform capability.

| Page / route | Initial purpose | MVP functionality |
| :--- | :--- | :--- |
| `Home /` | Public marketing landing page | Hero value proposition, short product explanation, core benefits, CTA to request a demo/contact, footer and navigation. |
| `Platform /platform` | Explain the product workflow | Show the four-step flow: capture → prioritise → follow up → measure. Explain supported use cases without promising unavailable capabilities. |
| `Solutions /solutions` | Explain target use cases | Initial use cases for B2B service firms and property businesses. Keep content modular; avoid building separate complex portals. |
| `Pricing /pricing` | Communicate commercial model | Starter / Growth / Business plan presentation with indicative or configurable pricing. Clearly label pricing as provisional until approved. |
| `Contact /contact` | Capture legitimate enquiries | Accessible contact form, validation, consent/privacy notice, success/error states and secure server-side handling. |
| `Login /login` | Application entry point | Functional authentication entry screen and protected-route foundation. If full auth is deferred, clearly label as a staged feature—not a fake working login. |
| `App dashboard /app` | First authenticated product surface | MVP overview: lead counts, follow-up queue, recent activity and simple conversion/outcome summary using seeded/demo data initially. |

### Navigation guidance
*   Public navigation: Platform, Solutions, Pricing, Contact; primary CTA: Request a demo.
*   Provide a clear Login link without making it the dominant marketing CTA.
*   Authenticated app navigation should be separate from the public marketing navigation.
*   On mobile, use a compact menu and keep the primary CTA easy to reach.
*   Every visible navigation item must resolve to a real route or be omitted until implemented.

### MVP priority
Build Home, Platform, Pricing and Contact first as the public website core. Build the application shell and dashboard as the first product slice. Solutions can be a simple page or section in the initial release. Authentication, persistence and CRM integration must be introduced in their own planned phases.

---

## 3. Visual theme and responsive experience
Preserve the approved theme: premium, modern, technology-led and trustworthy. The public marketing site should feel approachable and polished; the product dashboard should feel focused, information-dense and operational.

### Visual design tokens
| Token | Direction | Usage |
| :--- | :--- | :--- |
| Primary | Deep navy / charcoal (#14283D or close) | Brand foundation, headings, navigation and dashboard chrome. |
| Accent | Electric teal / cyan (#13B8A6 / #38BDF8) | Primary CTA, highlights, active states, data accents and focus indicators. |
| Marketing background | White and subtle light grey | Clean page surfaces, readable content and contrast. |
| Dashboard surfaces | Light neutral panels; optional dark navigation | Clear hierarchy between navigation, content and data cards. |
| Typography | Inter or a close sans-serif | Consistent, legible type scale; avoid decorative display fonts. |
| Components | Simple cards, restrained borders, subtle gradients | Use whitespace and alignment; avoid excessive glow, animation or glass effects. |

### Mobile experience — action focused
*   Prioritise alerts, lead status, lead score/reason, follow-up reminders and quick actions.
*   Use single-column layouts, large touch targets and short forms.
*   Show a compact summary of key metrics; defer dense charts and configuration to desktop.
*   Ensure contact actions work with appropriate device capabilities and permissions; do not assume WhatsApp or phone access.
*   Use responsive tables that become cards or horizontally scroll only when genuinely necessary.

### Desktop experience — analysis and management focused
*   Provide a persistent sidebar or clear application navigation.
*   Use a dashboard grid for KPIs, lead queue, recent activity and conversion trend.
*   Support richer filters, timelines, reporting and configuration.
*   Keep data tables readable with clear empty, loading and error states.
*   Avoid using desktop-only hover interactions for essential functionality.

### Responsive behaviour
Use a mobile-first layout and test at minimum around 360px, 390px, 768px, 1024px and 1440px viewport widths. Breakpoints should be driven by content, not device names. Prevent horizontal overflow and maintain accessible navigation at all widths.

### Accessibility baseline
*   Target WCAG 2.2 AA as the design and implementation goal.
*   Semantic HTML, logical heading order, keyboard navigation and visible focus states.
*   Sufficient text and UI contrast; never rely on colour alone to convey status.
*   Associate labels and errors with form controls; announce important status changes accessibly.
*   Provide alt text for meaningful images and respect reduced-motion preferences.

---

## 4. Functional scope and core workflows
The first product workflow should be end-to-end but intentionally modest. A user should be able to see a lead, understand why it needs attention, record a follow-up and view the resulting status.

### MVP workflow
1.  **Capture:** accept a lead submitted through the Signal contact/demo form or an authorised customer lead source.
2.  **Store:** validate and persist the lead with source, created time, status and consent/notice metadata where relevant.
3.  **Prioritise:** assign a transparent rule-based priority using known lead attributes and permitted activity. Show the reason for the score.
4.  **Follow up:** allow an authorised user to assign an owner, set a next action and update lead status.
5.  **Measure:** show counts by status, outstanding follow-ups and basic outcomes.

### Suggested lead fields
| Field | Description / rule |
| :--- | :--- |
| `id` | Unique internal identifier; generated server-side. |
| `name` | Lead name where supplied. |
| `email` / `phone` | Contact details supplied by the lead or received from an authorised source; validate and protect. |
| `company` | Optional company / organisation name. |
| `source` | Form, referral, CRM import or other approved source. |
| `status` | New, Qualified, Contacted, Converted, Disqualified or Archived. |
| `priority_score` | Rule-based numeric score; store score explanation / contributing factors. |
| `owner_id` | Optional assigned team member. |
| `next_follow_up_at` | Optional follow-up date/time. |
| `created_at` / `updated_at` | Server-managed timestamps. |
| `consent` / `notice metadata` | Record applicable notice, permission, source and marketing preference where required. |

### Minimum dashboard widgets
*   Total new leads in selected period.
*   Leads awaiting follow-up.
*   Qualified leads and conversion outcomes.
*   Recent activity / latest lead submissions.
*   Follow-up queue with status, priority and next action.

> **Important implementation rule**
> Do not fabricate analytics. Seeded demo data must be clearly identified as demo data. When there is no real data, show a useful empty state and explain how to add or import leads.

---

## 5. Phased delivery plan and gates
The coding agent must execute phases sequentially. It must not silently skip a phase or mark work complete without running the stated checks. A phase is complete only when its deliverables, tests and acceptance criteria are satisfied.

| Phase | Scope and deliverables | Exit gate |
| :--- | :--- | :--- |
| 0 — Discovery & documentation | Confirm assumptions, repository plan, requirements, risks, architecture decisions. Produce README.md, HLD.md and LLD.md before application code. | Human review/approval of all three documents; no app implementation before approval. |
| 1 — Foundation & design system | Repo scaffold, lint/format/test setup, theme tokens, reusable components, responsive shell, routing, Docker Compose and health check. | Clean Docker build/start; routes render; theme and responsive checks pass. |
| 2 — Public website | Home, Platform, Solutions (simple), Pricing and Contact pages; navigation, CTA, form validation and success/error states. | All links work; form safely handles submission; responsive and accessibility smoke tests pass. |
| 3 — App shell & dashboard | Login entry, protected-route foundation, dashboard layout, lead list/detail views using clearly labelled seed data if backend is not ready. | User can navigate app shell; demo data is explicit; loading/empty/error states exist. |
| 4 — Backend & persistence | API, database schema/migrations, lead CRUD, validation, tenant/customer boundary design, audit events and secure configuration. | CRUD and validation tests pass; data survives container restart; secrets are not committed. |
| 5 — Authentication & permissions | Secure authentication, session/token handling, role/permission checks, protected APIs and tenant isolation. | Unauthorised access is denied; auth and access-control tests pass. |
| 6 — Lead workflow | Rule-based scoring with explanations, status changes, assignment and follow-up scheduling. | End-to-end lead workflow works against persistent data; score reasons are visible. |
| 7 — Integrations & automation | One prioritised CRM/webhook integration, retry handling, idempotency, delivery logs and configurable notifications. | Integration tested with sandbox/mock; failures are observable and recoverable. |
| 8 — Hardening & release candidate | Accessibility, responsive, security, performance, backup/restore, documentation, seed/reset scripts and local test guide. | All acceptance tests pass; clean machine setup verified; known limitations documented. |

### Phase control protocol
1.  At the start of a phase, read the README, HLD, LLD and current phase status.
2.  State the phase objective, files/modules to be changed, dependencies and test plan.
3.  Implement only the approved scope. If a design decision materially changes architecture, update HLD/LLD and request review.
4.  Run automated tests, lint/type checks and relevant manual checks.
5.  Update README and a project progress log with completed work, commands run, results, known issues and next phase.
6.  Stop at the phase gate and report evidence. Do not start the next phase until the gate is accepted.

---

## 6. Technical architecture — initial recommendation
The coding agent should validate this proposal against the existing repository and available developer environment during Phase 0. Do not introduce unnecessary services or microservices in the MVP.

| Layer | Suggested approach | Notes |
| :--- | :--- | :--- |
| Frontend | React + TypeScript; Next.js or Vite depending on routing/SSR needs | Choose one framework and document why. Reusable accessible components. |
| Backend API | Node.js + TypeScript (e.g. Fastify or NestJS) | A modular monolith is preferred for the first release. |
| Database | PostgreSQL | Use migrations, constraints and indexes; persist data outside ephemeral containers. |
| Background work | Add Redis/queue only when async jobs or integrations require it | Avoid unnecessary infrastructure in Phase 1. |
| Containerisation | Docker + Docker Compose | Frontend/API/database services as needed; health checks and named volumes. |
| Testing | Unit + API/integration + browser end-to-end smoke tests | Use deterministic seed data and test configuration. |
| Observability | Structured logs, health endpoint and useful error handling | Never log secrets or unnecessary personal data. |

### Architecture guardrails
*   Use a modular monolith with clear boundaries (web, API, domain/services, persistence, integrations).
*   Keep secrets in environment variables / local `.env` files excluded from version control; provide `.env.example` with safe placeholders.
*   Use database migrations as the source of truth for schema changes.
*   Validate all input at the API boundary and enforce authorisation server-side.
*   Design for tenant separation before onboarding multiple customer organisations, even if the first local demo uses one tenant.
*   Use UTC timestamps in storage and present dates in the user's locale/timezone.
*   Add rate limiting and abuse controls to public forms and sensitive endpoints.
*   Do not store raw payment-card data. Payment integration is out of MVP scope.

### Suggested repository structure
The agent may adjust this after inspection, but must document any material deviation in the HLD/LLD.

```text
signal/
├── README.md
├── docs/
│   ├── HLD.md
│   ├── LLD.md
│   ├── requirements.md
│   ├── decisions/ (ADRs)
│   └── testing-and-release.md
├── apps/
│   ├── web/
│   └── api/
├── packages/ (shared types / validation, if needed)
├── infra/ (Docker and local development configuration)
├── scripts/ (seed, reset, checks)
├── .env.example
└── docker-compose.yml
```

---

## 7. Mandatory documentation before development
**Hard gate:** no application feature code may be written until `README.md`, `docs/HLD.md` and `docs/LLD.md` have been created, internally consistent and reviewed/approved. Phase 0 may include repository inspection and documentation only.

### README.md — developer entry point
*   Product summary, current scope and project status.
*   Prerequisites (Docker Engine/Desktop, Docker Compose plugin, Git and any required runtime/tooling).
*   Exact first-run commands, e.g. `cp .env.example .env`, `docker compose up --build`.
*   Local URLs for marketing site, app, API and health endpoint.
*   How to run migrations, seed demo data, run tests, lint and type-check.
*   How to stop services, view logs, reset local data and troubleshoot common issues.
*   Environment variable reference; never include real secrets.
*   Known limitations, supported browser assumptions and current phase.

### HLD.md — High-Level Design
*   System context and users / external systems.
*   Scope, non-goals, assumptions and architecture principles.
*   Logical architecture diagram and component responsibilities.
*   Deployment / Docker topology and data-flow diagrams.
*   Key technology choices with rationale and alternatives considered.
*   Security, privacy, tenant isolation, availability and scalability approach.
*   External integrations, trust boundaries and failure handling.
*   Major risks, dependencies and architecture decision records.

### LLD.md — Low-Level Design
*   Repository/module structure and responsibilities.
*   Route/page inventory and key component contracts.
*   API endpoints with methods, request/response examples and error model.
*   Database ERD, tables, fields, constraints, indexes and migrations.
*   Lead lifecycle, scoring rules and status transition rules.
*   Authentication, authorisation and tenant-scoping details.
*   Validation schemas, background jobs and integration contracts.
*   Unit/integration/e2e test cases mapped to requirements.

### Documentation quality gate
*   HLD and LLD must agree on framework, service boundaries, database and deployment model.
*   Every MVP page and workflow must map to a requirement and test.
*   Diagrams must be included in Mermaid or another source-controlled text format where practical.
*   Open questions and assumptions must be explicit; do not invent answers silently.
*   Update documents whenever implementation materially changes the design.

---

## 8. Docker and local development requirements
The project must be runnable on a developer machine using Docker Compose, with a documented one-command startup path after initial environment setup.

### Expected local developer experience
```bash
# 1. Configure local environment
cp .env.example .env

# 2. Build and start the stack
docker compose up --build -d

# 3. Check running services
docker compose ps

# 4. View logs
docker compose logs -f

# 5. Stop the stack
docker compose down
```
The agent must adapt command names to the actual implementation and record the final commands in README.md.

### Docker requirements
*   Provide Dockerfile(s) and `docker-compose.yml` (or `compose.yaml`).
*   Use health checks and service dependencies based on health, not arbitrary sleep delays.
*   Persist PostgreSQL data using a named volume for normal development.
*   Provide a deterministic database migration and seed process.
*   Support a documented reset command that clearly warns before deleting local data.
*   Use non-root containers where practical; use multi-stage builds for production-oriented images.
*   Do not bake secrets into images or commit `.env`.
*   Expose only the ports needed for local development and document them.
*   Verify the project starts from a clean clone with no hidden local prerequisites.

### Local test access
The finished project must be accessible in a local browser. The exact ports are to be selected and documented by the agent. Provide a health endpoint for the API and a clear frontend route for the dashboard. No deployment to a public server is required for this local testing milestone.

---

## 9. Privacy, security and responsible data handling
Signal may process contact details and activity data. The product must be designed to handle such data carefully. This brief is not legal advice; obtain qualified South African privacy advice before production use.
*   Use data supplied directly by users/leads or otherwise lawfully obtained and authorised for the stated purpose.
*   Display appropriate privacy notices at collection points and capture relevant permission/preferences.
*   Do not identify anonymous website visitors as named individuals through covert fingerprinting, hidden tracking or unauthorised data matching.
*   Keep marketing consent separate from service-related communications where appropriate; support opt-out and suppression.
*   Minimise data collected, restrict access by role and tenant, and define retention/deletion procedures.
*   Protect credentials and sessions; apply secure cookie settings where applicable, CSRF protections where relevant, and safe password handling.
*   Use parameterised database access, output encoding and server-side validation.
*   Add audit trails for sensitive administrative actions without logging full personal data unnecessarily.
*   Provide clear demo-data labelling and never mix seed records with customer production records.

### Security release checks
*   No secrets, tokens or production personal data in repository history.
*   Dependency and container image checks run and findings assessed.
*   Protected API routes reject unauthenticated and unauthorised requests.
*   Tenant-scoped queries are tested to prevent cross-customer data access.
*   Public forms have validation, rate limiting and spam/abuse controls.
*   Errors do not expose stack traces, secrets or sensitive records to end users.

---

## 10. Testing, accessibility and acceptance criteria
Testing must be incremental. Each phase adds tests for its scope; Phase 8 performs a full regression and clean-machine verification.

| Area | Minimum acceptance criteria |
| :--- | :--- |
| Functional | All implemented routes work; forms validate and provide success/error feedback; dashboard workflow is coherent; no dead buttons or placeholder links. |
| Responsive | No critical overflow or clipped content at agreed mobile, tablet and desktop widths; navigation works by touch and keyboard. |
| Accessibility | Semantic structure, keyboard access, visible focus, labels/errors, contrast checks and reduced-motion support. |
| Quality | Lint, formatting, type checking and automated tests pass; no unexplained console errors. |
| Data | Migrations work from an empty database; seed is repeatable; data persists across restart; reset is documented. |
| Security | Auth and permissions enforced server-side; tenant boundaries tested; secrets excluded; public endpoints protected. |
| Docker | Clean build and startup succeed; health checks become healthy; logs are useful; documented stop/reset works. |
| Documentation | README, HLD, LLD and testing guide match the actual implementation and commands. |

### Definition of done for a phase
*   All agreed scope implemented; no unapproved scope creep.
*   Acceptance criteria checked and evidence recorded.
*   Relevant tests pass and failures are resolved or explicitly accepted.
*   No critical or high-severity defect remains open without explicit approval.
*   Documentation and progress log updated.
*   Agent provides a concise handover: changed files, commands run, test results, known issues and next phase recommendation.

---

## 11. Antigravity coding-agent operating instructions
Paste the following operating instructions into the coding agent along with this PDF. The agent should treat the specification as the source of truth unless the owner approves a change.

> You are the implementation agent for Signal. 1. Begin in DISCOVERY / DOCUMENTATION ONLY mode. Inspect the existing repository and available environment. Do not create application feature code. 2. Produce README.md, docs/HLD.md and docs/LLD.md, plus requirements.md and a concise risk/assumption register. Ensure all three mandatory documents agree. 3. Present the documents, proposed stack, repository structure, page inventory, data model, Docker plan and unresolved decisions for owner review. STOP and wait for approval. 4. After approval, implement one phase at a time in the sequence in this specification. Do not begin a later phase until the current phase gate is met and accepted. 5. Before each phase, state scope, files/modules affected, dependencies and test plan. Keep changes focused and avoid unnecessary dependencies. 6. After each phase, run relevant lint, type checks, tests and Docker checks. Report actual commands and results; never claim a test passed unless it was run. 7. Keep README.md, HLD.md, LLD.md, test instructions and progress log current. Record architecture changes and decisions. 8. Do not fake integrations, authentication, analytics or data. Clearly label mocks and seed data. 9. Follow the approved visual theme and accessibility/privacy requirements. Do not implement covert visitor identification or unauthorised personal-data enrichment. 10. If requirements conflict, are ambiguous, or require a material architecture/security decision, stop and ask the owner rather than silently guessing. 11. At the end of each phase, provide: summary, files changed, commands executed, test results, screenshots or local routes where useful, known issues, and a recommendation for the next phase. 12. Final outcome: a working, accessible, responsive website and MVP application that can be started and tested locally using documented Docker commands.

### Agent must stop before development
The agent's first deliverable is documentation and an architecture proposal only. Do not accept a response that creates the application scaffold or feature implementation before the owner has reviewed and approved `README.md`, `HLD.md` and `LLD.md`.

---

## 12. Owner review checklist and final handover
Use this checklist to control the build and validate the final handover.
*   I have reviewed and approved README.md, HLD.md and LLD.md before application development.
*   The public site matches the approved navy / teal premium theme.
*   The first release contains only the agreed core pages and functional workflows.
*   All navigation, forms, dashboard controls and calls to action work as described.
*   Mobile and desktop experiences have both been tested.
*   The app is keyboard usable and has passed the agreed accessibility checks.
*   Docker Compose can build and start the complete local stack from a clean clone.
*   Database migrations, seed data, persistence and reset are documented and verified.
*   Authentication, permissions and tenant boundaries are tested before real customer data is used.
*   Privacy notices, consent/marketing preferences, retention and deletion requirements have been reviewed.
*   Automated tests pass; known issues and limitations are documented.
*   The final handover includes exact startup/test commands, local URLs, environment setup and phase completion evidence.

### Final delivery package
| Deliverable | Expected outcome |
| :--- | :--- |
| Working source repository | Version-controlled application and infrastructure configuration. |
| README.md | A new developer can set up, run, test and troubleshoot locally. |
| docs/HLD.md | Approved high-level architecture and deployment design. |
| docs/LLD.md | Detailed routes, modules, APIs, data model and workflow design. |
| Docker setup | Repeatable local build/start/stop/reset with health checks and persistent development data. |
| Test suite and test guide | Reproducible automated and manual checks. |
| Progress / release notes | Phase-by-phase evidence, limitations and next steps. |

### End of specification
This document establishes the initial build direction. It does not remove the need for owner approval of the Phase 0 architecture and documentation, nor for legal/security review before processing real customer data in production.