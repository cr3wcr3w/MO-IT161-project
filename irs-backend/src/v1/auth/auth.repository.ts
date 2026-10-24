import { and, desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { roleRequests, roles, user, userRoles } from "../../db/schema/auth.js";

export const getProfileById = async (userId: string) => {
	const [profile] = await db
		.select({
			roleName: roles.name,
			emailVerified: user.emailVerified,
			createdAt: user.createdAt,
		})
		.from(user)
		.innerJoin(userRoles, eq(userRoles.userId, user.id))
		.innerJoin(roles, eq(roles.id, userRoles.roleId))
		.where(eq(user.id, userId))
		.limit(1);

	return profile ?? null;
};

export type RequestedRole = "triage" | "researcher";

export const roleRequestRepository = {
	async create(userId: string, requestedRole: RequestedRole) {
		const [request] = await db
			.insert(roleRequests)
			.values({
				userId,
				requestedRole,
			})
			.returning();

		return request;
	},

	async findByUserId(userId: string) {
		return db
			.select()
			.from(roleRequests)
			.where(eq(roleRequests.userId, userId))
			.orderBy(desc(roleRequests.createdAt));
	},

	async findPendingByUserId(userId: string) {
		const [request] = await db
			.select()
			.from(roleRequests)
			.where(
				and(
					eq(roleRequests.userId, userId),
					eq(roleRequests.status, "pending"),
				),
			)
			.limit(1);

		return request ?? null;
	},

	async findAll() {
		return db
			.select({
				id: roleRequests.id,
				userEmail: user.email,
				requestedRole: roleRequests.requestedRole,
				status: roleRequests.status,
				reviewedBy: roleRequests.reviewedBy,
				createdAt: roleRequests.createdAt,
				updatedAt: roleRequests.updatedAt,
			})
			.from(roleRequests)
			.leftJoin(user, eq(roleRequests.userId, user.id))
			.orderBy(desc(roleRequests.createdAt));
	},

	async updateStatus(
		requestId: string,
		status: "pending" | "approved" | "rejected",
		reviewedBy: string,
	) {
		return db.transaction(async (tx) => {
			// Find the role request.
			const [request] = await tx
				.select()
				.from(roleRequests)
				.where(eq(roleRequests.id, requestId))
				.limit(1);

			if (!request) {
				return null;
			}

			// Assign the requested role when approved.
			if (status === "approved") {
				const [role] = await tx
					.select({ id: roles.id })
					.from(roles)
					.where(eq(roles.name, request.requestedRole))
					.limit(1);

				if (!role) {
					throw new Error(`Role "${request.requestedRole}" does not exist.`);
				}

				// Insert the role or replace the user's existing role.
				await tx
					.insert(userRoles)
					.values({
						userId: request.userId,
						roleId: role.id,
					})
					.onConflictDoUpdate({
						target: userRoles.userId,
						set: {
							roleId: role.id,
						},
					});
			}

			// Update the request status.
			const [updatedRequest] = await tx
				.update(roleRequests)
				.set({
					status,
					reviewedBy,
					updatedAt: new Date(),
				})
				.where(eq(roleRequests.id, requestId))
				.returning();

			return updatedRequest ?? null;
		});
	},
};
