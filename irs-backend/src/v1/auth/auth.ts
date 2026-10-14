import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { db } from "../../db/index.js";
import * as authSchema from "../../db/schema/auth.js";

const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL;

if (!BETTER_AUTH_URL) {
	throw new Error("BETTER_AUTH_URL is not defined");
}

const auth = betterAuth({
	trustedOrigins: [BETTER_AUTH_URL],

	database: drizzleAdapter(db, {
		provider: "pg",
		schema: authSchema,
	}),
	basePath: "/api/v1/auth",
	emailAndPassword: {
		enabled: true,
	},
	// Name is not required for this application.
	user: {
		additionalFields: {
			name: {
				type: "string",
				required: false,
				defaultValue: "",
				input: false,
				returned: false,
			},
		},
	},
	// Name is not required for this application.
	hooks: {
		before: createAuthMiddleware(async (ctx) => {
			// Better Auth hard-requires `name` in the sign-up body schema; fill it
			// so clients don't have to send one. Stored as "" and never returned.
			if (ctx.path === "/sign-up/email") {
				return { context: { body: { ...ctx.body, name: "" } } };
			}
		}),
	},
});

export default auth;
