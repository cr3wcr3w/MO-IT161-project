import { z } from "zod";

const EnvSchema = z.object({
	// Application
	// NODE_ENV: z.enum(["development", "production"]).default("development"),
	BACKEND_PORT: z.coerce.number().int().min(1).max(65535).default(8000),

	// Database
	DATABASE_URL: z.url(),

	// Better Auth
	BETTER_AUTH_SECRET: z.string().min(32),
	BETTER_AUTH_URL: z.url(),
});

export type Env = z.infer<typeof EnvSchema>;

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error("❌ Invalid environment variables:");
	console.error(JSON.stringify(z.treeifyError(parsedEnv.error), null, 2));

	process.exit(1);
}

export const env: Env = parsedEnv.data;
