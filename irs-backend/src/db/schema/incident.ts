import {
	integer,
	pgEnum,
	pgSchema,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth.js";
export const incidentSchema = pgSchema("incident");

// submitted          Initial state: the report has been submitted but has not yet been reviewed or classified by the triage team.
//     ↓
// under_review       Triage or an authorized user is checking the report's validity, details, and whether further investigation is needed.
//     ├── rejected   The report was determined to be invalid, a duplicate, or outside the system's scope. A reason should be recorded.
//     ↓
// in_progress        The report has been accepted for investigation, and the team is actively working on it.
//     ↓
// resolved           The incident has been addressed or the investigation has reached its intended outcome, but the report may still need finalization.
//     ↓
// closed             The report is finalized. No further action is expected unless it is reopened through your application's workflow.
export const statuses = incidentSchema.table("statuses", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	name: text("name").notNull().unique(),
	description: text("description").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const severityEnum = pgEnum("severity", [
	"low", // Minor impact, limited urgency
	"medium", // Potential impact that needs investigation
	"high", // Significant risk or suspected compromise
	"critical", // Severe, ongoing, or widespread impact
]);

// to get the participant, just get who timneline the report
export const reports = incidentSchema.table("reports", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: text("title").notNull(),
	bounty: integer("bounty").notNull().default(0),
	severity: severityEnum("severity"),
	reportBy: text("report_by")
		.notNull()
		.references(() => user.id),
	statusId: integer("status_id")
		.notNull()
		.references(() => statuses.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	// soft-deleted
	deleteAt: timestamp("deleted_at"),
});

// timeline messages are immutable after creation to preserve message integrity
// and prevent users from altering previously submitted information.
// Users may delete their own messages, which are soft-deleted using deletedAt
export const timeline = incidentSchema.table("timeline", {
	id: uuid("id").defaultRandom().primaryKey(),
	reportId: uuid("report_id")
		.notNull()
		.references(() => reports.id, { onDelete: "cascade" }),
	message: text("message").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	deleteAt: timestamp("deleted_at"),
});
