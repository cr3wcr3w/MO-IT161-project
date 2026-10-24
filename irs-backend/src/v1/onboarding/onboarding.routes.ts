import { Hono } from "hono";
import { every } from "hono/combine";
import {
	RateLimitCategory,
	rateLimitMiddleware,
} from "../../shared/middleware/rate-limiter.js";
import { requireAuthMiddleware } from "../../shared/middleware/require-auth.js";
import { onboardingController } from "./onboarding.controller.js";

const onboardingRoutes = new Hono();
onboardingRoutes.use("*", requireAuthMiddleware);

onboardingRoutes.get(
	"/steps",
	every(
		rateLimitMiddleware(RateLimitCategory.MODERATE),
		onboardingController.getSteps,
	),
);
onboardingRoutes.get(
	"/progress",
	every(
		rateLimitMiddleware(RateLimitCategory.MODERATE),
		onboardingController.getProgress,
	),
);
onboardingRoutes.patch(
	"/progress",
	every(
		rateLimitMiddleware(RateLimitCategory.MODERATE),
		onboardingController.advanceStep,
	),
);

export { onboardingRoutes };
