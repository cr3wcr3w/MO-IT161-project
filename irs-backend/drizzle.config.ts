import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env";

if (env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not defined");
}

export default defineConfig({
	out: "./drizzle",
	schema: [
		"./src/db/schema/auth.ts",
		"./src/db/schema/incident.ts",
		"./src/db/schema/logging.ts",
	],
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
