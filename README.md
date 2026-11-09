# Signal

**Turn missed opportunities into measurable revenue.**

Signal is a platform for businesses to capture legitimate enquiries, prioritize opportunities, and automate timely sales follow-ups.

## Project Status
**Phase 4:** Backend API & Persistence (Completed)

## Prerequisites
To run this project locally, ensure you have the following installed:
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine
*   Docker Compose plugin
*   Git
*   Node.js (v20+) and `npm` or `pnpm` (for local development tooling outside of Docker, optional but recommended)

## First-Run Instructions

1.  **Clone the repository** (if not already done) and navigate to the project root:
    ```bash
    cd /Users/kebogile/sites/Personal/signal
    ```

2.  **Configure local environment:**
    ```bash
    cp .env.example .env
    ```

3.  **Build and start the stack in detached mode:**
    ```bash
    docker compose up --build -d
    ```

4.  **Check running services:**
    ```bash
    docker compose ps
    ```

5.  **Run database migrations and seed data:**
    Navigate to the `apps/api` directory and use the Prisma CLI:
    ```bash
    cd apps/api
    npm run db:migrate
    npm run db:seed
    ```

6.  **Open Prisma Studio (Optional GUI for Database):**
    ```bash
    cd apps/api
    npm run db:studio
    ```

## Local URLs
Once the Docker stack is running, the services will be available at:
*   **Web Application (Marketing & Dashboard):** `http://localhost:3000`
*   **Backend API:** `http://localhost:4000`
*   **API Health Endpoint:** `http://localhost:4000/health`

## Common Development Commands

*   **View logs:** `docker compose logs -f` (Append `web` or `api` for specific services)
*   **Stop services:** `docker compose down`
*   **Reset local data (WARNING: Destructive):** `docker compose down -v`
*   **Run linter:** `npm run lint` (To be configured in Phase 1)
*   **Run type checks:** `npm run typecheck` (To be configured in Phase 1)
*   **Run tests:** `npm run test` (To be configured in Phase 1)

## Environment Variables
*(To be expanded as development progresses. Never commit real secrets.)*

| Variable | Description | Default (Local) |
| :--- | :--- | :--- |
| `NODE_ENV` | Application environment | `development` |
| `PORT` | API Port | `4000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@db:5432/signal` |
| `JWT_SECRET` | Secret key for JWT signing | `local-dev-secret-do-not-use-in-prod` |

## Known Limitations & Assumptions
*   **Single Tenant MVP:** The initial local demo will utilize a single tenant, but the database and API are structured for multi-tenancy from day one.
*   **No Native Mobile App:** Signal is a responsive web application (mobile-first layout).
*   **No Predictive AI:** Prioritization is currently rule-based.
