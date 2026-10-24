import { z } from "zod";

const EnvSchema = z.object({
	// Application
	BACKEND_PORT: z.coerce.number().int().min(1).max(65535),

	// Database
	DATABASE_URL: z.url(),

	// Better Auth
	BETTER_AUTH_SECRET: z.string().min(32),
	BETTER_AUTH_URL: z.url(),

	// SMTP gmail
	SMTP_HOST: z.string().optional(),
	SMTP_PORT: z.coerce.number().int().min(1).max(65535).optional(),
	SMTP_USER: z.string().optional(),
	SMTP_PASS: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error("❌ Invalid environment variables:");
	console.error(JSON.stringify(z.treeifyError(parsedEnv.error), null, 2));

	process.exit(1);
}

export const env: Env = parsedEnv.data;
