import {
	integer,
	jsonb,
	pgSchema,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth.js";
import type { AuditAction } from "./logging.constant.js";

export const loggingSchema = pgSchema("logging");

export const logLevelEnum = loggingSchema.enum("log_level", [
	"error",
	"warn",
	"info",
	"debug",
]);

export const applicationLogs = loggingSchema.table("application_logs", {
	id: uuid("id").defaultRandom().primaryKey(),
	level: logLevelEnum("level").notNull(),
	message: text("message").notNull(),
	userId: text("user_id").references(() => user.id, {
		onDelete: "set null",
	}),
	method: varchar("method", { length: 10 }),
	path: text("path"),
	statusCode: integer("status_code"),
	errorStack: text("error_stack"),
	metadata: jsonb("metadata"),
	createdAt: timestamp("created_at", {
		withTimezone: true,
	})
		.defaultNow()
		.notNull(),
});

export const auditLogs = loggingSchema.table("audit_logs", {
	id: uuid("id").defaultRandom().primaryKey(),

	actorUserId: text("actor_user_id").references(() => user.id, {
		onDelete: "set null",
	}),

	action: varchar("action", { length: 100 }).$type<AuditAction>().notNull(),

	tableName: varchar("table_name", { length: 100 }),
	primaryKey: text("primary_key"),

	oldValues: jsonb("old_values"),
	newValues: jsonb("new_values"),

	ipAddress: varchar("ip_address", { length: 45 }),

	createdAt: timestamp("created_at", {
		withTimezone: true,
	})
		.defaultNow()
		.notNull(),
});
