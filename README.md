# MO-IT161 Project
[![Biome Checks](https://github.com/cr3wcr3w/MO-IT161-project/actions/workflows/biome.yml/badge.svg)](https://github.com/cr3wcr3w/MO-IT161-project/actions/workflows/biome.yml)

A full-stack **Incident Reporting System (IRS)** developed in response to a company's need for a centralized Public Disclosure Program. The system is designed to support incident reporting, review, triage, and research through a structured web application with role-based access control.

The project aims to provide an organized workflow for handling incident reports, managing user access, and supporting authorized personnel in reviewing and analyzing submitted information.

> Demo and Setup Guide: [video link](https://drive.google.com/file/d/1WlR5fhIScv_NeWs36hOWB2XTySVUq6XR/view?usp=sharing)

### Key Features

- [x] **Authentication and Authorization** — Secure user accounts and sessions using Better Auth.
- [x] **Email OTP Verification** — Verify email addresses using time-limited, six-digit one-time passwords (OTPs) during onboarding.
- [x] **Role-Based Access Control (RBAC)** — Manage permissions for administrators, guests, triage personnel, and researchers.
- [ ] **User Onboarding** — Guide new users through account registration, email verification, default guest role assignment, and initial access to the application.
- [x] **Role Request and Approval** — Allow guests to request elevated access as triage personnel or researchers, subject to administrator approval.
- [ ] **Incident Management** — Create, manage, and track incident reports, including their statuses and timelines.
- [ ] **Incident Review and Triage** — Review submitted reports, prioritize incidents, and coordinate their handling.
- [ ] **Application Logging and Auditing** — Maintain application logs for troubleshooting and audit records for tracking significant user actions and data changes.

### Technology Stack

- **Frontend:** React, TypeScript, Vite, Tanstack Query/Router, Tailwind, Shadcn, Zustand 
- **Backend:** Hono, TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Auth:** Better Auth
- **Development Environment:** npm Workspaces and Docker

### Project Documentation

- [Application Development Workflow Worksheet](https://docs.google.com/spreadsheets/d/1C-wW2bvE4yw-rXKVVgnWuuIV_vbb4lYJ-UH7wK0LbYA/edit?usp=sharing)
- [View Setup and Installation Guide](/setup.md)
- [View Postman API Documentation](/docs/docs-postman/MO-IT161.postman_collection.json)
- [View Design Mockup](docs/docs-img/design.png)
- [View GitHub Convention File](docs/docs-github-convention/github_convention.md)
- [View Backend documentation](/irs-backend/README.md)
- [View Frontend documentation](/irs-frontend/README.md)

### AI Use Statement

AI tools, were used to assist in developing the website design concept, creating supporting visual mockups, and improving code quality through code suggestions, debugging assistance, and implementation guidance. All AI-generated suggestions were reviewed and adapted as needed to fit the project's requirements.

### Architecture and Development Conventions

- **Feature-based Frontend:** Organizes components, hooks, API functions, and state management by application feature.
- **Versioned Backend API:** Groups backend modules under versioned directories (e.g., `v1`) to maintain clear API boundaries and support future versions.
- **RESTful API Design:** Uses resource-oriented routes and appropriate HTTP methods, documented consistently in Postman.
- **Composition and Reusability:** Composes frontend components and backend functions and middleware into focused, reusable units.
- **Separation of Concerns:** Separates routes, controllers, services, validation schemas, and database operations according to their responsibilities.

### Database Schema Overview

The project uses PostgreSQL and Drizzle ORM, with three schemas:

- **`auth`** — Manages authentication, sessions, accounts, and role-based access control.
- **`incident`** — Manages incident reports, statuses, and report timelines.
- **`logging`** — Organizes application logs for debugging and monitoring separately from audit logs that track significant user actions and data changes.
- **`onBoarding`** — Manages onboarding steps and user progress, including the current step and completion timestamp, to track account setup and determine whether a user has completed onboarding.

Each schema has a distinct responsibility, improving maintainability and separating authentication, incident management, and logging concerns.

### Project Structure

The repository uses a monorepo architecture managed through npm Workspaces. The frontend and backend are maintained as separate workspaces while sharing root-level configuration and dependency management.

```text
MO-IT161-project/
├── irs-backend/
│   ├── src/
│   └── package.json
├── irs-frontend/
│   ├── src/
│   └── package.json
├── .github/
├── docs/
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
├── README.md
└── sample.env
```

