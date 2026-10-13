import winston from "winston";

const { combine, timestamp, colorize, errors, json, printf } = winston.format;

const isDevelopment = process.env.NODE_ENV === "development";

const devFormat = combine(
	errors({ stack: true }),
	timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	colorize(),
	printf(({ timestamp, level, message, stack }) => {
		return `${timestamp} ${level}: ${stack ?? message}`;
	}),
);

const prodFormat = combine(errors({ stack: true }), timestamp(), json());

/**
 * Application logger.
 *
 * Development: colored, readable console output at debug level.
 * Production: structured JSON console output at info level.
 *
 * @example
 * logger.debug("Debugging a database query");
 * logger.info("Server started");
 * logger.warn("Unexpected request");
 * logger.error("Something failed");
 */
export const logger = winston.createLogger({
	level: isDevelopment ? "debug" : "info",
	format: isDevelopment ? devFormat : prodFormat,
	transports: [new winston.transports.Console()],
});
