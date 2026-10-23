import {
	emailOTPClient,
	inferAdditionalFields,
	twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_API_URL,
	basePath: "/api/v1/auth",
	plugins: [
		twoFactorClient(),
		inferAdditionalFields({
			user: {
				name: {
					type: "string",
					required: false,
				},
			},
		}),
		emailOTPClient(),
	],
});

export const { signIn, signUp, signOut, useSession } = authClient;
