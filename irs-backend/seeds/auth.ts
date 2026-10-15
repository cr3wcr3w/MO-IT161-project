import { eq } from "drizzle-orm";
import { db } from "../src/db/index.js";
import { roles, user, userRoles } from "../src/db/schema/auth.js";
import auth from "../src/v1/auth/auth.js";

const roleSeeds = [
	{ name: "admin" },
	{ name: "triage" },
	{ name: "researcher" },
	{ name: "guest" },
] as const;

export async function seedRoles() {
	console.log("Seeding roles...");

	await db
		.insert(roles)
		.values([...roleSeeds])
		.onConflictDoNothing();

	console.log("Roles seeded successfully!");
}

const userSeeds = [
	{ name: "Admin User", email: "admin@example.com" },
	{ name: "Triage User", email: "triage@example.com" },
	{ name: "Researcher User", email: "researcher@example.com" },
	{ name: "Guest User", email: "guest@example.com" },
] as const;

export async function seedUsers() {
	const password = "12345678";

	console.log("Seeding users...");

	for (const seed of userSeeds) {
		const [existingUser] = await db
			.select({ id: user.id })
			.from(user)
			.where(eq(user.email, seed.email))
			.limit(1);

		if (existingUser) {
			console.log(`User already exists: ${seed.email}`);
			continue;
		}

		const result = await auth.api.signUpEmail({
			body: {
				name: seed.name,
				email: seed.email,
				password,
			},
		});

		console.log(`Created user: ${result.user.email}`);
	}

	console.log("Users seeded successfully!");
}

const userRoleSeeds = [
	{ email: "admin@example.com", role: "admin" },
	{ email: "triage@example.com", role: "triage" },
	{ email: "researcher@example.com", role: "researcher" },
	{ email: "guest@example.com", role: "guest" },
] as const;

export async function seedChangeUserRoles() {
	console.log("Seeding user roles...");

	for (const seed of userRoleSeeds) {
		const [existingUser] = await db
			.select({ id: user.id })
			.from(user)
			.where(eq(user.email, seed.email))
			.limit(1);

		if (!existingUser) {
			throw new Error(`User "${seed.email}" not found.`);
		}

		const [role] = await db
			.select({ id: roles.id })
			.from(roles)
			.where(eq(roles.name, seed.role))
			.limit(1);

		if (!role) {
			throw new Error(`Role "${seed.role}" not found.`);
		}

		// Replace the default guest assignment with the intended seed role.
		await db
			.insert(userRoles)
			.values({
				userId: existingUser.id,
				roleId: role.id,
			})
			.onConflictDoUpdate({
				target: userRoles.userId,
				set: {
					roleId: role.id,
				},
			});

		console.log(`Assigned role "${seed.role}" to ${seed.email}`);
	}

	console.log("User roles seeded successfully!");
}
