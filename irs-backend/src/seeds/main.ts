import { db } from "../db/index.js";
import { seedRoles, seedUsers } from "./auth.js";
import { seedReportStatuses } from "./incident.js";

export async function seeds() {
	await seedRoles();
	await seedUsers();
	await seedReportStatuses();
}

seeds()
	.catch((error) => {
		console.error("Failed to seed database:", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await db.$client.end();
	});
