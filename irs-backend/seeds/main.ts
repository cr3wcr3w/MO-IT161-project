import { pool } from "../src/db/index.js";
import { seedChangeUserRoles, seedRoles, seedUsers } from "./auth.js";
import { seedReportStatuses } from "./incident.js";

async function seeds() {
	try {
		await seedRoles();
		await seedUsers();
		await seedChangeUserRoles();
		await seedReportStatuses();
	} catch (error) {
		console.error("Failed to seed database:", error);
		process.exitCode = 1;
	} finally {
		await pool.end();
	}
}

seeds();
