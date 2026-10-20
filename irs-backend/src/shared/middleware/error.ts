import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

// StatusCodes is an enum with a string reverse-mapping, so Object.values()
// yields both numeric codes (500) and string names ("INTERNAL_SERVER_ERROR").
const validStatuses = new Set<number>(
	Object.values(StatusCodes).filter((v): v is number => typeof v === "number"),
);

/** Type guard: narrows a code to ContentfulStatusCode if it's a known status. */
const isValidStatus = (code: number): code is ContentfulStatusCode =>
	validStatuses.has(code);

export const errorMiddleware: ErrorHandler = (err, c) => {
	if (err instanceof HTTPException) {
		const status = isValidStatus(err.status)
			? err.status
			: StatusCodes.INTERNAL_SERVER_ERROR;

		// getReasonPhrase throws for unknown codes, but `status` is guaranteed
		// to be a known code because of the validStatuses check above.
		const message = getReasonPhrase(status);

		return c.json({ message }, status);
	}

	return c.json(
		{
			message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
		},
		StatusCodes.INTERNAL_SERVER_ERROR,
	);
};
