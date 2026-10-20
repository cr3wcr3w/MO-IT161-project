import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env";

export default defineConfig({
	out: "./drizzle",
	schema: [
		"./src/db/schema/auth.ts",
		"./src/db/schema/incident.ts",
		"./src/db/schema/logging.ts",
		"./src/db/schema/onboarding.ts",
	],
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
