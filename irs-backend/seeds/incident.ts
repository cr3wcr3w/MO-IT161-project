import { db } from "../src/db/index.js";
import { statuses } from "../src/db/schema/incident.js";

const reportStatusSeeds = [
	{
		name: "submitted",
		description:
			"The report has been received and is awaiting initial assessment.",
	},
	{
		name: "under_review",
		description:
			"Triage is checking the report's validity, completeness, relevance, and possible duplication.",
	},
	{
		name: "invalid",
		description:
			"The report contains insufficient, incorrect, or unverifiable information to proceed.",
	},
	{
		name: "duplicate",
		description:
			"The same incident has already been reported in another report.",
	},
	{
		name: "out_of_scope",
		description:
			"The report does not fall within the incidents or matters handled by the system.",
	},
	{
		name: "in_progress",
		description:
			"The report has been accepted for further investigation or follow-up.",
	},
	{
		name: "resolved",
		description:
			"The investigation or required response has reached a documented outcome.",
	},
	{
		name: "closed",
		description:
			"The report has been finalized, and no further action is currently expected.",
	},
] as const;

export async function seedReportStatuses() {
	console.log("Seeding report statuses...");

	await db
		.insert(statuses)
		.values([...reportStatusSeeds])
		.onConflictDoNothing();

	console.log("Report statuses seeded successfully!");
}
