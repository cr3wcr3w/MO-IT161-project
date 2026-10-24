import type { NotFoundHandler } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const notFoundMiddleware: NotFoundHandler = (c) => {
	return c.json(
		{
			data: null,
			message: ReasonPhrases.NOT_FOUND,
		},
		StatusCodes.NOT_FOUND,
	);
};
