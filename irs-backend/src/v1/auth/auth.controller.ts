import { Hono } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { requireAuthMiddleware } from "../../shared/middleware/require-auth.js";
import { getProfileById } from "./auth.repository.js";

export const authController = new Hono();

authController.get("/get-profile", requireAuthMiddleware, async (c) => {
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
		return c.json({ message: ReasonPhrases.NOT_FOUND }, StatusCodes.NOT_FOUND);
	}

	return c.json({ profile }, StatusCodes.OK);
});
