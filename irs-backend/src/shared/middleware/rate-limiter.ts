import { rateLimiter } from "hono-rate-limiter";

export enum RateLimitCategory {
	LENIENT = "lenient",
	MODERATE = "moderate",
	STRICT = "strict",
}

const RATE_LIMIT_CONFIG = {
	[RateLimitCategory.LENIENT]: {
		windowMs: 15 * 60 * 1000, // Time window in milliseconds (15 minutes)
		limit: 300, // Maximum number of requests allowed within the window
	},
	[RateLimitCategory.MODERATE]: {
		windowMs: 15 * 60 * 1000, // Time window in milliseconds (15 minutes)
		limit: 100, // Suitable for general API endpoints with moderate traffic
	},
	[RateLimitCategory.STRICT]: {
		windowMs: 15 * 60 * 1000, // Time window in milliseconds (15 minutes)
		limit: 10, // Suitable for sensitive endpoints, such as authentication
	},
} as const;

/**
 * Creates a rate-limiting middleware for the specified category.
 *
 * @param category - The rate-limit category that determines the request limit and time window.
 * @returns A Hono middleware that limits requests based on the client's IP address.
 */
export const rateLimitMiddleware = (category: RateLimitCategory) => {
	const config = RATE_LIMIT_CONFIG[category];

	return rateLimiter({
		windowMs: config.windowMs,
		limit: config.limit,
		// Use IP address as key
		keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "",
	});
};
