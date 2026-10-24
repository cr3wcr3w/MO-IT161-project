import { z } from "zod";

const EnvSchema = z.object({
	VITE_API_URL: z.url(),
});

const parsedEnv = EnvSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
	console.error("Invalid environment variables:");
	console.error(JSON.stringify(z.treeifyError(parsedEnv.error), null, 2));

	throw new Error("Invalid environment variables.");
}

export const env = parsedEnv.data;
