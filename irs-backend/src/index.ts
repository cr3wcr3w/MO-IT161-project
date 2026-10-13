import { serve } from "@hono/node-server";
import { Hono } from "hono";
import auth from "./lib/auth.js";
import { logger } from "./shared/helper/logger.js";

const app = new Hono();

const port = Number(process.env.BACKEND_PORT);

if (!port) {
	throw new Error("BACKEND_PORT is not defined");
}

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

logger.debug("This is a debug message");
logger.info("Server started successfully");
logger.warn("This is a warning");
logger.error("Something went wrong");

// Test structured metadata
logger.info("Database query completed", {
	operation: "findReports",
	durationMs: 24,
});

serve(
	{
		fetch: app.fetch,
		port,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
