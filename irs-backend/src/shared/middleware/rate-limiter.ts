import { createMiddleware } from "hono/factory";
import { rateLimiter } from "hono-rate-limiter";

export enum RateLimitCategory {
	LENIENT = "lenient",
	MODERATE = "moderate",
	STRICT = "strict",
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

const RATE_LIMIT_CONFIG = {
	[RateLimitCategory.LENIENT]: {
		windowMs: RATE_LIMIT_WINDOW_MS,
		limit: 300,
	},
	[RateLimitCategory.MODERATE]: {
		windowMs: RATE_LIMIT_WINDOW_MS,
		limit: 100,
	},
	[RateLimitCategory.STRICT]: {
		windowMs: RATE_LIMIT_WINDOW_MS,
		limit: 10,
	},
} as const;

/**
 * Creates a rate-limiting middleware for the specified category.
 *
 * @param category - The rate-limit category to apply.
 * @returns A Hono middleware that limits requests by client IP.
 */
export const rateLimitMiddleware = (category: RateLimitCategory) => {
	const { windowMs, limit } = RATE_LIMIT_CONFIG[category];

	const limiter = rateLimiter({
		windowMs,
		limit,
		keyGenerator: (c) =>
			c.req.header("x-forwarded-for")?.split(",")[0]?.trim() || "unknown",
	});

	return createMiddleware(async (c, next) => {
		return limiter(c, next);
	});
};
