import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { roles, user, userRoles } from "../db/schema/auth.js";
import auth from "../lib/auth.js";

const roleSeeds = [
	{ name: "admin" },
	{ name: "triage" },
	{ name: "researcher" },
] as const;

async function seedRoles() {
	console.log("Seeding roles...");

	await db
		.insert(roles)
		.values([...roleSeeds])
		.onConflictDoNothing();

	console.log("Roles seeded successfully!");
}

const userSeeds = [
	{
		name: "Admin User",
		email: "admin@example.com",
		role: "admin",
	},
	{
		name: "Triage User",
		email: "triage@example.com",
		role: "triage",
	},
	{
		name: "Researcher User",
		email: "researcher@example.com",
		role: "researcher",
	},
] as const;

async function seedUsers() {
	const password = "12345678";

	console.log("Seeding users...");

	for (const seed of userSeeds) {
		// Find the role
		const [role] = await db
			.select()
			.from(roles)
			.where(eq(roles.name, seed.role))
			.limit(1);

		if (!role) {
			throw new Error(`Role "${seed.role}" not found.`);
		}

		// Check whether the user already exists
		const [existingUser] = await db
			.select({ id: user.id })
			.from(user)
			.where(eq(user.email, seed.email))
			.limit(1);

		let userId = existingUser?.id;

		// Create the account through Better Auth if needed
		if (!userId) {
			const result = await auth.api.signUpEmail({
				body: {
					name: seed.name,
					email: seed.email,
					password,
				},
			});

			userId = result.user.id;

			console.log(`Created user: ${seed.email} with password: ${password}`);
		} else {
			console.log(
				`User already exists: ${seed.email} with password: ${password}`,
			);
		}

		// Assign the role through the connection table
		await db
			.insert(userRoles)
			.values({
				userId,
				roleId: role.id,
			})
			.onConflictDoNothing();

		console.log(`Assigned role "${seed.role}" to ${seed.email}`);
	}

	console.log("Users seeded successfully!");
}

export async function seeds() {
	await seedRoles();
	await seedUsers();
}

seeds()
	.catch((error) => {
		console.error("Failed to seed database:", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await db.$client.end();
	});
