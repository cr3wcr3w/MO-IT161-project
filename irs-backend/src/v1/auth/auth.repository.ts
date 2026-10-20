import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { roles, user, userRoles } from "../../db/schema/auth.js";

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
