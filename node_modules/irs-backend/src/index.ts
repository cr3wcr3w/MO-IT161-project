import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

const port = Number(process.env.BACKEND_PORT ?? 8000);

app.get("/", (c) => {
	return c.text("Hello Hono!");
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
