# Backend Documentation

- **Service Isolation:** Keep services and their related routes in separate feature folders under the appropriate API version (e.g., `v1/email`). This allows services to be extracted, replaced, or reused with minimal refactoring.
- **API Versioning and SRP:** Use versioned directories and the Single Responsibility Principle to maintain clear boundaries and independent modules.
- **Naming Conventions:** Inside each versioned module, use consistent, descriptive file names. Formats such as `.service`, `.controller`, `.routes`, and `.schema` are conventions, not strict requirements.
- **Request Validation:** Validate `POST` request bodies using Zod middleware before they reach the route handler.
- **Response Format:** Follow a consistent JSON response structure:

```ts
{
  data: object | null;
  status: number;
}
```
