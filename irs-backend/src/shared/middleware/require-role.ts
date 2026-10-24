import { eq } from "drizzle-orm";
import { createMiddleware } from "hono/factory";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { db } from "../../db/index.js";
import { roles, userRoles } from "../../db/schema/auth.js";
import auth from "../../v1/auth/auth.js";

type Variables = {
	session: typeof auth.$Infer.Session | null;
};

export type Role = "admin" | "triage" | "researcher" | "guest";

export const requireRole = (...allowedRoles: Role[]) =>
	createMiddleware<{
		Variables: Variables;
	}>(async (c, next) => {
		const session = await auth.api.getSession({
			headers: c.req.raw.headers,
		});

		if (!session) {
			return c.json(
				{
					data: null,
					message: ReasonPhrases.UNAUTHORIZED,
				},
				StatusCodes.UNAUTHORIZED,
			);
		}

		c.set("session", session);

		const [userRole] = await db
			.select({
				role: roles.name,
			})
			.from(userRoles)
			.innerJoin(roles, eq(userRoles.roleId, roles.id))
			.where(eq(userRoles.userId, session.user.id))
			.limit(1);

		if (!userRole || !allowedRoles.includes(userRole.role)) {
			return c.json(
				{
					data: null,
					message: ReasonPhrases.FORBIDDEN,
				},
				StatusCodes.FORBIDDEN,
			);
		}

		await next();
	});
