## Setup

[Watch the Setup Demo](https://drive.google.com/file/d/1WlR5fhIScv_NeWs36hOWB2XTySVUq6XR/view?usp=sharing)

### 1. Install Dependencies

Run the following command from the repository root:

```bash
npm install
```

### 2. Configure Environment Variables

Create your `.env` file from the provided sample:

```bash
cp sample.env .env
```

Edit `.env` as needed for your local environment.

Example configuration:

```env
BACKEND_PORT=8000
FRONTEND_PORT=3000

POSTGRES_DB=mydatabase
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_PORT=5432

DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase

BETTER_AUTH_SECRET=your-secure-secret
BETTER_AUTH_URL=http://localhost:8000
VITE_API_URL=http://localhost:8000

# Optional: SMTP configuration for sending emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
```

Generate a secure `BETTER_AUTH_SECRET` using:

```bash
openssl rand -base64 32
```

Copy the generated value into your `.env` file.

**Environment variables**

- **Backend:** `DATABASE_URL`, `BACKEND_PORT`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS`.
- **Frontend:** `FRONTEND_PORT` and `VITE_API_URL`.
- **Docker/PostgreSQL:** `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_PORT`.

**Optional SMTP Configuration (Gmail)**

SMTP is optional for local development. If SMTP is not configured, the application can still start, and verification OTPs can be printed in the backend terminal for testing.

To enable email delivery through Gmail:

1. **Enable 2-Step Verification** in your [Google Account Security settings](https://myaccount.google.com/security).
2. **Generate an App Password** from [Google App Passwords](https://myaccount.google.com/apppasswords).
3. **Update your root `.env` file** with your Gmail credentials:

   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   ```

   Replace the example values with your Gmail address and generated App Password. Do not use your regular Gmail password.

4. **Restart the backend** to load the updated environment variables.

> **Security:** Never commit your `.env` file or expose your SMTP credentials in source control.


### 3. Start PostgreSQL

The project requires access to a PostgreSQL database. Running PostgreSQL through Docker is optional.

#### Option 1: PostgreSQL with Docker

Start the PostgreSQL container from the repository root:

```bash
npm run docker:start
```

The container uses the PostgreSQL configuration specified in `.env`.

#### Option 2: Use an Existing PostgreSQL Database

If you already have a PostgreSQL server or prefer a hosted provider, you do not need to run Docker.

Update `DATABASE_URL` in `.env` with your database connection string:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
```

You can use [Neon](https://neon.com/) or another PostgreSQL provider.

> **Note:** Docker is provided as a convenient way to run PostgreSQL locally. It is not required as long as you have access to a PostgreSQL database.

### 4. Run Database Migrations

This project uses Drizzle ORM to manage database schema migrations.

Ensure your PostgreSQL database is running and accessible, then generate migration files whenever your schema changes:

```bash
npm run drizzle:generate
```

Apply pending migrations:

```bash
npm run drizzle:migrate
```

To open Drizzle Studio and inspect your database:

```bash
npm run drizzle:studio
```

Command reference:

- `drizzle:generate` — Generates migration files based on schema changes.
- `drizzle:migrate` — Applies pending migrations to the database.
- `drizzle:studio` — Opens the database browser.

These commands load the root `.env` through the configured Drizzle setup. You do not need a separate `.env` file inside `irs-backend`.

### 5. Seed the Database

The project includes a database seed script that populates the database with default roles and test accounts for development and testing.

After applying the database migrations, run:

```bash
npm run drizzle:seed
```

The seed script creates the following roles and test users:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `12345678` |
| Triage | `triage@example.com` | `12345678` |
| Researcher | `researcher@example.com` | `12345678` |

> **Note:** Run the seed command against your development database before testing authentication in the application or through Postman. The seed script creates missing users and assigns their roles. Existing users are not automatically updated with a new password.

These credentials are for development and testing only. Do not use them in production.

### 6. Start the Applications

From the repository root, run:

```bash
npm run dev
```

This starts the frontend and backend concurrently.

Development URLs:

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8000
- **PostgreSQL:** `localhost:5432` (only when using local PostgreSQL through Docker)