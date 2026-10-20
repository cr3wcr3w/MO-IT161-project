import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { env } from "./config/env.js";
import { errorMiddleware } from "./shared/middleware/error.js";
import { notFoundMiddleware } from "./shared/middleware/not-found.js";
import { authRoutes } from "./v1/auth/auth.routes.js";

const app = new Hono();

// middleware
app.use(
	"*",
	cors({
		origin: env.BETTER_AUTH_URL,
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);
app.use(logger());
app.notFound(notFoundMiddleware);
app.onError(errorMiddleware);

// routes
app.get("/", (c) => {
	return c.text("Hello, World!");
});
app.route("/api/v1/auth", authRoutes);

serve(
	{
		fetch: app.fetch,
		port: env.BACKEND_PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
