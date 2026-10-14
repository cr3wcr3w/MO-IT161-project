import type { NotFoundHandler } from "hono";
import * as HttpStatusCodes from "../constant/http-status/codes.js";
import * as HttpStatusPhrases from "../constant/http-status/phrases.js";

export const notFoundHandler: NotFoundHandler = (c) => {
	return c.json(
		{
			message: HttpStatusPhrases.NOT_FOUND,
		},
		HttpStatusCodes.NOT_FOUND,
	);
};
