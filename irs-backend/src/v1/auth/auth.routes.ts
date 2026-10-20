import { Hono } from "hono";
import { every } from "hono/combine";
import {
	RateLimitCategory,
	rateLimitMiddleware,
} from "../../shared/middleware/rate-limiter.js";
import { authController } from "./auth.controller.js";
import auth from "./auth.js";

export const authRoutes = new Hono();

// rate limit
authRoutes.use(
	"/get-session",
	every(rateLimitMiddleware(RateLimitCategory.LENIENT)),
);
authRoutes.use(
	"/sign-in/email",
	every(rateLimitMiddleware(RateLimitCategory.STRICT)),
);
authRoutes.use(
	"/sign-up/email",
	every(rateLimitMiddleware(RateLimitCategory.STRICT)),
);
authRoutes.use(
	"/sign-out",
	every(rateLimitMiddleware(RateLimitCategory.STRICT)),
);
authRoutes.use(
	"/forget-password/*",
	every(rateLimitMiddleware(RateLimitCategory.STRICT)),
);
authRoutes.use(
	"/reset-password",
	every(rateLimitMiddleware(RateLimitCategory.STRICT)),
);
authRoutes.use(
	"/change-password",
	every(rateLimitMiddleware(RateLimitCategory.STRICT)),
);

// custom routes
authRoutes.route("/", authController);

// Better Auth catch-all must stay last so custom routes are matched first
authRoutes.on(["POST", "GET"], "/*", (c) => {
	return auth.handler(c.req.raw);
});
