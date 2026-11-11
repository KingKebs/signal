# Signal Development Changelog

This document provides a detailed, narrative breakdown of the changes implemented during each development phase. For a high-level task checklist, refer to `DEVELOPMENT_PHASES.md`.

---

## Phase 7: Automated Prioritization & Workflows (Completed)

### Backend Changes (`apps/api`):
1. **Added a Dashboard Stats Endpoint**: Created `GET /api/leads/dashboard/stats` in `LeadsController`.
2. **Aggregated Data**: The `LeadsService` now queries the PostgreSQL database using Prisma to aggregate the live `Total Leads`, `Qualified`, `Pipeline Value`, and breaks them down by deal stages.
3. **Activity & Priority Queue**: The endpoint fetches the 4 most recent `FollowUp` actions for the Activity Feed and fetches the top 5 leads sorted by `priorityScore` (the automated prioritization we set up in Phase 4) for the Priority Queue.
4. **TypeScript & Schema Fixes**: Fixed a TypeScript discrepancy by aligning the `FollowUp` queries with the Prisma schema, utilizing `scheduledAt` and `completedAt` rather than generic `createdAt` variables.

### Frontend Changes (`apps/web`):
1. **Live Dashboard Components**: Replaced the hardcoded mock data array in `/app/page.tsx` with a Next.js Server Component `fetch` call pointing to our new API endpoint. 
2. **Data Formatting**: Installed `date-fns` inside the Next.js container to format the Recent Activity feed's dates relative to the current time (e.g. "2 minutes ago").
3. **Fixed Invalid HTML Attributes**: Cleaned up a few `Button` and `Link` structures inside the frontend UI preventing `asChild` prop-types errors, adhering properly to Radix/Shadcn styling.

---

## Phase 6: Lead Management & Follow-ups (Completed)

### Backend Changes (`apps/api`):
1. **Lead Status Mutation**: Whitelisted the `status` field in the `UpdateLeadDto` to allow the frontend to safely mutate a lead's status via `PATCH /api/leads/:id`.
2. **Follow-up Activities**: Implemented a `POST /api/leads/:id/follow-ups` endpoint to allow users to log calls, emails, and meetings on a lead's timeline.

### Frontend Changes (`apps/web`):
1. **Dynamic Queues & Details**: Converted the static `/app/leads` queue and `/app/leads/[id]` details pages into Server Components that fetch live data directly from the NestJS backend.
2. **Interactive Lead Actions**: Built the `LeadActions.tsx` React Portal Modal to log follow-ups and update lead statuses without being trapped by CSS containing blocks.
3. **Public Lead Capture**: Connected the public marketing `/contact` form to the backend `POST /api/leads/capture` endpoint, allowing real site visitors to enter the CRM queue.

---

## Phase 5: Authentication & Permissions (Backend Complete / Frontend Deferred)

### Backend Changes (`apps/api`):
1. **JWT Strategy**: Installed and configured `@nestjs/jwt` and Passport strategies to issue signed JSON Web Tokens upon successful login.
2. **Mock Credentials**: Set up a dummy admin user (`admin@wayne.com` / `password123`) in the Prisma seed script to validate the authentication flow.
3. **Docker Stability Pivot**: Resolved severe Prisma/Next.js caching issues in Docker by bypassing the NestJS CLI watcher and running `ts-node/esm` directly, purging stale volumes to restore container stability. Frontend route protection was deferred to maintain momentum.

---

## Phase 4: Backend API & Persistence (Completed)

### Backend Changes (`apps/api`):
1. **Database Infrastructure**: Configured PostgreSQL and Prisma ORM. Created the initial schema (`Tenant`, `User`, `Lead`, `FollowUp`).
2. **Scoring Logic**: Implemented basic rule-based priority scoring in `LeadsService` (e.g., +30 points for explicit demo requests, -20 points for free email providers).
3. **API Collection**: Created a Postman/Insomnia compatible API collection (`docs/Signal_API_Collection.json`) for local endpoint validation.

---

## Phases 1-3: UI, Marketing, and Foundation (Completed)
*   **Phase 3**: Built the protected App Shell layout (`/app`), sidebar navigation, and the initial static mockup of the Dashboard KPIs and Lead Tables.
*   **Phase 2**: Delivered the responsive public marketing site (Home, Pricing, Solutions, Platform) and the interactive contact form using React Hook Form + Zod.
*   **Phase 1**: Initialized the Turborepo-style monorepo, Docker Compose stack, Next.js 14, NestJS, and injected brand design tokens (Deep Navy, Electric Teal).
