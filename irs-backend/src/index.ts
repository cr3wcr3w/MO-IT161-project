import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { notFoundHandler } from "./shared/middleware/not-found.js";
import { authRoutes } from "./v1/auth/auth.routes.js";

const app = new Hono();
const port = Number(process.env.BACKEND_PORT);
if (!port) {
	throw new Error("BACKEND_PORT is not defined");
}

// middleware
app.use(logger());

// routes
app.route("/api/v1/auth", authRoutes);
app.notFound(notFoundHandler);

serve(
	{
		fetch: app.fetch,
		port,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
