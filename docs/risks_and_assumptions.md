# Risks & Assumptions Register

This register documents the technical and product assumptions made during Phase 0, as well as risks to be mitigated in subsequent phases.

## Assumptions

| ID | Category | Assumption | Impact if False |
| :--- | :--- | :--- | :--- |
| A01 | **Architecture** | The MVP will be deployed as a single application suite (Modular Monolith) rather than a distributed microservices ecosystem. | High. Moving to microservices will require significant infrastructure overhead (Kafka/RabbitMQ, Kubernetes) not budgeted for MVP. |
| A02 | **Multi-Tenancy** | While the first local release is effectively a single-tenant demo, the data model and API security must be designed for full multi-tenancy from Day 1. | High. Retrofitting multi-tenancy after data persistence is implemented leads to severe security vulnerabilities and data migrations. |
| A03 | **Prioritization** | "Rule-based scoring" implies simple conditional logic (e.g., specific domains, filled fields) and does not require a machine learning pipeline or Python backend. | Medium. If ML is required, the NestJS stack will need an adjunct Python service. |
| A04 | **Authentication** | Standard JWT (JSON Web Tokens) with a secure hashing mechanism (bcrypt) is sufficient for MVP authentication; OIDC/SAML enterprise SSO is deferred. | Low. Can be integrated into NestJS Passport strategies later. |

## Risks

| ID | Category | Risk Description | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| R01 | **Security** | Accidental cross-tenant data leakage if API queries do not correctly scope the `tenant_id`. | **Mitigation:** Implement a global Prisma middleware or NestJS interceptor that automatically appends the current user's `tenant_id` to all database queries. |
| R02 | **Privacy** | Logging of sensitive PII (Personal Identifiable Information) in application logs. | **Mitigation:** Strict logging rules. Only log UUIDs, status codes, and non-PII attributes. Exclude request body dumps from production logging. |
| R03 | **Scope Creep** | Dashboard design becoming overly complex with charts and BI (Business Intelligence) requirements. | **Mitigation:** Adhere strictly to the "Minimum dashboard widgets" defined in the specification (simple counts and lists). Defer D3/Chart.js integrations unless explicitly approved. |
| R04 | **Spam/Abuse** | Public `/contact` endpoint being flooded by automated bots, polluting the database. | **Mitigation:** Implement strict rate-limiting on the API gateway and consider integrating a simple honeypot or captcha mechanism in Phase 2. |