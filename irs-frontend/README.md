# Frontend Structure and Patterns

## 1. Project Structure

The frontend is located in `irs-frontend/` and follows a feature-based structure to keep related functionality organized and maintainable.

```text
irs-frontend/
├── public/                 # Static assets
├── src/
│   ├── features/           # Feature-specific modules
│   │   └── signin/
│   │       └── components/ # Feature-specific components
│   ├── shared/             # Reusable components and utilities
│   └── routeTree.gen.ts    # Generated route tree
├── package.json
└── vite.config.ts
```

## 2. Structural Patterns

- **Feature-based organization:** Keep components and logic related to a specific feature together inside `features/`.
- **Shared components:** Place reusable UI components and utilities in `shared/` instead of duplicating them across features.
- **Component-based UI:** Build pages and interfaces using small, reusable React components.
- **File-based routing:** Follow the existing TanStack Router conventions when creating or modifying routes. Do not manually edit generated route files.
- **Separation of concerns:** Keep UI presentation, form validation, API communication, and state management organized according to their responsibilities.

## 3. Development Guidelines

- Follow the existing naming conventions and folder patterns.
- Use TypeScript for component props and application data.
- Reuse existing components before creating new ones.
- Keep feature-specific logic within its corresponding feature whenever practical.
- Follow the established patterns for styling, forms, and state management.

