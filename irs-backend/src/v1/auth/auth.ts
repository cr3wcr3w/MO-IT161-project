import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { customSession, emailOTP } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { env } from "../../config/env.js";
import { db } from "../../db/index.js";
import * as authSchema from "../../db/schema/auth.js";
import { progress } from "../../db/schema/onboarding.js";
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
		customSession(async ({ user: authUser, session }) => {
			const [onboardingProgress] = await db
				.select({
					completedAt: progress.completedAt,
				})
				.from(progress)
				.where(eq(progress.userId, authUser.id))
				.limit(1);

			return {
				user: {
					...authUser,
					isOnboardingComplete:
						onboardingProgress?.completedAt !== null &&
						onboardingProgress?.completedAt !== undefined,
				},
				session,
			};
		}),
	],
});

export default auth;
