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
		return db.select().from(roleRequests).orderBy(desc(roleRequests.createdAt));
	},
};
