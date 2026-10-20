import type { NotFoundHandler } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const notFoundMiddleware: NotFoundHandler = (c) => {
	return c.json(
		{
			message: ReasonPhrases.NOT_FOUND,
		},
		StatusCodes.NOT_FOUND,
	);
};
