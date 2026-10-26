# Backend Structure and Patterns

## 1. Project Structure

The backend is located in `irs-backend/` and organizes API modules under `v1/`, separating routes, controllers, and repositories by responsibility.

```text
irs-backend/
└── src/
    ├── v1/
    │   └── email/
    │       ├── email.routes.ts       # API route definitions
    │       ├── email.controller.ts   # Request and response handling
    │       ├── email.repository.ts   # Database operations
    │       └── email.schema.ts       # Request validation schemas
    ├── middleware/                   # Authentication and request processing
    ├── lib/                          # Shared utilities and configurations
    └── db/                           # Database connection and schema
```

*The directory tree illustrates the intended pattern; feature names and file names should follow the actual implementation.*

## 2. Structural Patterns

- **Service Isolation:** Keep related routes, controllers, and repositories in separate feature folders under the appropriate API version (e.g., `v1/email`). This allows modules to be extracted, replaced, or reused with minimal refactoring.
- **API Versioning and SRP:** Use versioned directories and the Single Responsibility Principle (SRP) to maintain clear boundaries and independent modules.
- **Naming Conventions:** Use consistent, descriptive file names. Formats such as `.routes`, `.controller`, `.repository`, `.service`, and `.schema` are conventions, not strict requirements.
- **Request Validation:** Validate `POST` request bodies using Zod middleware before they reach the controller.
- **Middleware:** Handle authentication, rate limiting, and shared request processing separately from feature logic.
- **Database Separation:** Use repositories to manage database queries and Drizzle ORM for PostgreSQL operations.
- **Error Handling:** Maintain consistent error handling for HTTP exceptions, unexpected errors, and unmatched routes.

## 3. Response Format

Follow a consistent JSON response structure for API responses:

```ts
{
  data: object | null;
  status: number;
}
```

- `data`: The response payload, or `null` when no data is returned.
- `status`: The HTTP status code associated with the response.

## 4. Development Guidelines

- Keep route definitions, request handling, and database operations in their respective layers.
- Keep controllers focused on HTTP requests and responses.
- Place reusable business logic in services where appropriate.
- Use repositories for database access rather than querying the database directly in controllers.
- Validate incoming data before processing requests.
- Protect private endpoints with authentication middleware.
- Keep secrets in environment variables.
- Reuse shared utilities and database configurations instead of duplicating logic.