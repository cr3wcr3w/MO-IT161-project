import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { env } from "./config/env.js";
import { notFoundMiddleware } from "./shared/middleware/not-found.js";
import { authRoutes } from "./v1/auth/auth.routes.js";

const app = new Hono();

// middleware
app.use(logger());

// routes
app.route("/api/v1/auth", authRoutes);
app.notFound(notFoundMiddleware);

serve(
	{
		fetch: app.fetch,
		port: env.BACKEND_PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
