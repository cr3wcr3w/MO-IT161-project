import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	throw new Error("DATABASE_URL is not defined");
}

const databaseUrl = DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL is not defined");
}

export default defineConfig({
	out: "./drizzle",
	schema: ["./src/db/schema/auth.ts"],
	dialect: "postgresql",
	dbCredentials: {
		url: databaseUrl,
	},
});
