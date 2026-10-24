import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { emailOTP } from "better-auth/plugins";
import { env } from "../../config/env.js";
import { db } from "../../db/index.js";
import * as authSchema from "../../db/schema/auth.js";
import { sendEmail } from "../email/email.service.js";
import { generateOnBoardingEmail } from "../email/email.templates.js";

// note: put this in somewhere not here
export const OTP_EXPIRES_IN_SECONDS = 180;
export const OTP_EXPIRES_IN_MINUTES = OTP_EXPIRES_IN_SECONDS / 60;

const auth = betterAuth({
	trustedOrigins: [env.BETTER_AUTH_URL],

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

	plugins: [
		// this will be use in onBoarding
		emailOTP({
			otpLength: 6,
			expiresIn: OTP_EXPIRES_IN_SECONDS,
			sendVerificationOnSignUp: false,
			overrideDefaultEmailVerification: true,

			async sendVerificationOTP({ email, otp, type }) {
				if (type !== "email-verification") {
					throw new Error("Unsupported email OTP type");
				}

				console.log({ OTP: otp });

				const template = generateOnBoardingEmail({
					otp,
					expiresInMinutes: OTP_EXPIRES_IN_MINUTES,
				});

				await sendEmail({
					to: email,
					...template,
				});
			},
		}),
		// customSession(async({user: authUser, session}) => {
		// 	const [userRole] = await db
		// 		.select({
		// 			role: roles.name,
		// 		})
		// 		.from(userRoles)
		// 		.innerJoin(roles, eq(userRoles.roleId, roles.id))
		// 		.where(eq(userRoles.userId, authUser.id))
		// 		.limit(1);

		// 	if (!userRole) {
		// 		throw new Error("User has no assigned role.");
		// 	}

		// 	return {
		// 		user: {
		// 			...authUser,
		// 			role: userRole?.role
		// 		},
		// 		session,
		// 	};
		// })
	],
});

export default auth;
