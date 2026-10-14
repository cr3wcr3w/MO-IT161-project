import { Hono } from "hono";
import { every } from "hono/combine";
import {
	RateLimitCategory,
	rateLimitMiddleware,
} from "../../shared/middleware/rate-limiter.js";
import auth from "./auth.js";

export const authRoutes = new Hono();

authRoutes.use("*", every(rateLimitMiddleware(RateLimitCategory.STRICT)));

authRoutes.on(["POST", "GET"], "/*", (c) => {
	return auth.handler(c.req.raw);
});
