import { integer, pgSchema, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.js";

export const onboardingSchema = pgSchema("onboarding");

export const StepStatusEnum = onboardingSchema.enum("step_status", [
	"PENDING",
	"IN_PROGRESS",
	"COMPLETED",
]);

export const steps = onboardingSchema.table("steps", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

	title: text("title").notNull(),
	description: text("description").notNull(),
	status: StepStatusEnum("status").notNull().default("PENDING"),
	stepOrder: integer("order").notNull().unique(),

	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const progress = onboardingSchema.table("progress", {
	userId: text("user_id")
		.primaryKey()
		.references(() => user.id, { onDelete: "cascade" }),

	currentStepId: integer("current_step_id").references(() => steps.id, {
		onDelete: "set null",
	}),

	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});
