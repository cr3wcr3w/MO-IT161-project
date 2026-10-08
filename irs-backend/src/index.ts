import { serve } from "@hono/node-server";
import { Hono } from "hono";
import auth from "./lib/auth.js";

const app = new Hono();

const port = Number(process.env.BACKEND_PORT);

if (!port) {
	throw new Error("BACKEND_PORT is not defined");
}

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

serve(
	{
		fetch: app.fetch,
		port,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
