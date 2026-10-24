import { Hono } from "hono";
import { every } from "hono/combine";
import {
	RateLimitCategory,
	rateLimitMiddleware,
} from "../../shared/middleware/rate-limiter.js";
import { requireAuthMiddleware } from "../../shared/middleware/require-auth.js";
import { requireRole } from "../../shared/middleware/require-role.js";
import { authController } from "./auth.controller.js";
import auth from "./auth.js";

export const authRoutes = new Hono();

// rate limit
authRoutes.use(
	"/get-session",
	requireAuthMiddleware,
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
	requireAuthMiddleware,
	every(rateLimitMiddleware(RateLimitCategory.STRICT)),
);
authRoutes.use(
	"/forget-password/*",
	requireAuthMiddleware,
	every(rateLimitMiddleware(RateLimitCategory.STRICT)),
);
authRoutes.use(
	"/reset-password",
	requireAuthMiddleware,
	every(rateLimitMiddleware(RateLimitCategory.STRICT)),
);
authRoutes.use(
	"/change-password",
	requireAuthMiddleware,
	every(rateLimitMiddleware(RateLimitCategory.STRICT)),
);

// Custom routes
authRoutes.get(
	"/get-profile",
	requireAuthMiddleware,
	every(rateLimitMiddleware(RateLimitCategory.LENIENT)),
	authController.getProfile,
);
// Submit a role request.
authRoutes.post(
	"/role-requests",
	requireAuthMiddleware,
	requireRole("guest"),
	every(rateLimitMiddleware(RateLimitCategory.MODERATE)),
	authController.roleRequestRoutes,
);
// GET the me request
authRoutes.get(
	"/role-requests/me",
	requireAuthMiddleware,
	every(rateLimitMiddleware(RateLimitCategory.LENIENT)),
	authController.getMyRoleRequests,
);
// GET all request
authRoutes.get(
	"/role-requests/all",
	requireAuthMiddleware,
	every(rateLimitMiddleware(RateLimitCategory.LENIENT)),
	authController.getAllRoleRequests,
);
// patch change status
authRoutes.patch(
	"/role-requests/:id/status",
	requireAuthMiddleware,
	requireRole("admin"),
	every(rateLimitMiddleware(RateLimitCategory.MODERATE)),
	authController.updateRoleRequestStatus,
);

// Better Auth catch-all must stay last so custom routes are matched first
authRoutes.on(["POST", "GET"], "/*", (c) => {
	return auth.handler(c.req.raw);
});
