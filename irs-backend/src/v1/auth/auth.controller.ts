import { Hono } from "hono";
import { every } from "hono/combine";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
	RateLimitCategory,
	rateLimitMiddleware,
} from "../../shared/middleware/rate-limiter.js";
import { requireAuthMiddleware } from "../../shared/middleware/require-auth.js";
import { getProfileById } from "./auth.repository.js";

export const authController = new Hono();

authController.get(
	"/get-profile",
	requireAuthMiddleware,
	every(rateLimitMiddleware(RateLimitCategory.LENIENT)),
	async (c) => {
		// userId comes from the session set by requireAuthMiddleware
		const session = c.get("session");

		if (!session) {
			return c.json(
				{ message: ReasonPhrases.UNAUTHORIZED },
				StatusCodes.UNAUTHORIZED,
			);
		}

		const profile = await getProfileById(session.user.id);

		if (!profile) {
			return c.json(
				{ message: ReasonPhrases.NOT_FOUND },
				StatusCodes.NOT_FOUND,
			);
		}

		// better auth use top level so im not gonna follow our api response format here
		return c.json(profile, StatusCodes.OK);
	},
);
