import { createMiddleware } from "hono/factory";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import auth from "../../v1/auth/auth.js";

type Variables = {
	session: typeof auth.$Infer.Session | null;
};

export const requireAuthMiddleware = createMiddleware<{
	Variables: Variables;
}>(async (c, next) => {
	const session = await auth.api.getSession({
		headers: c.req.raw.headers,
	});

	if (!session) {
		return c.json(
			{
				message: ReasonPhrases.UNAUTHORIZED,
			},
			StatusCodes.UNAUTHORIZED,
		);
	}

	c.set("session", session);

	await next();
});
