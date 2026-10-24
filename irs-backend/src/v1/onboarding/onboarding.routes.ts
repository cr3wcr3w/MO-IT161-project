import { Hono } from "hono";
import { every } from "hono/combine";
import {
	RateLimitCategory,
	rateLimitMiddleware,
} from "../../shared/middleware/rate-limiter.js";
import { requireAuthMiddleware } from "../../shared/middleware/require-auth.js";
import { requireRole } from "../../shared/middleware/require-role.js";
import { onboardingController } from "./onboarding.controller.js";

const onboardingRoutes = new Hono();
onboardingRoutes.use("*", requireAuthMiddleware);

onboardingRoutes.get(
	"/steps",
	every(
		requireRole("guest"),
		rateLimitMiddleware(RateLimitCategory.MODERATE),
		onboardingController.getSteps,
	),
);
onboardingRoutes.get(
	"/progress",
	every(
		requireRole("guest"),
		rateLimitMiddleware(RateLimitCategory.MODERATE),
		onboardingController.getProgress,
	),
);
onboardingRoutes.patch(
	"/progress",
	every(
		requireRole("guest"),
		rateLimitMiddleware(RateLimitCategory.MODERATE),
		onboardingController.advanceStep,
	),
);

export { onboardingRoutes };
