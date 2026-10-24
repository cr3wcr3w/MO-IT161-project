import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	pgEnum,
	pgSchema,
	primaryKey,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core";

export const authSchema = pgSchema("auth");

export const user = authSchema.table("user", {
	id: text("id").primaryKey(),
	// Name: Required by Better Auth, but not used by the application.
	name: text("name").notNull().default(""),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	// Image: Required by Better Auth, but not used by the application.
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	deletedAt: timestamp("deleted_at"),
});

export const session = authSchema.table(
	"session",
	{
		id: text("id").primaryKey(),
		expiresAt: timestamp("expires_at").notNull(),
		token: text("token").notNull().unique(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(table) => [index("session_userId_idx").on(table.userId)],
);

export const account = authSchema.table(
	"account",
	{
		id: text("id").primaryKey(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
		scope: text("scope"),
		password: text("password"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = authSchema.table(
	"verification",
	{
		id: text("id").primaryKey(),
		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));

export const roleNameEnum = pgEnum("roleNameEnum", [
	"admin", // IT preffesional
	"triage", // the security team
	"researcher", // the bug hunter
	"guest", // default
]);

export const roles = authSchema.table("roles", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: roleNameEnum("role").notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRoles = authSchema.table(
	"user_roles",
	{
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),

		roleId: uuid("role_id")
			.notNull()
			.references(() => roles.id, { onDelete: "restrict" }),

		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		// Ensures each user-role pair is unique in the junction table.
		primaryKey({ columns: [table.userId, table.roleId] }),
		// Improves query performance when looking up users by role.
		index("user_roles_role_id_idx").on(table.roleId),
		// Each user can have only one role.
		unique("user_roles_user_id_unique").on(table.userId),
	],
);

export const roleRequestStatusEnum = pgEnum("role_request_status", [
	"pending",
	"approved",
	"rejected",
]);

export const roleRequestRoleEnum = pgEnum("role_request_role", [
	"triage",
	"researcher",
]);

export const roleRequests = authSchema.table(
	"role_requests",
	{
		id: uuid("id").defaultRandom().primaryKey(),

		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),

		requestedRole: roleRequestRoleEnum("requested_role").notNull(),

		status: roleRequestStatusEnum("status").notNull().default("pending"),

		reviewedBy: text("reviewed_by").references(() => user.id, {
			onDelete: "set null",
		}),

		createdAt: timestamp("created_at").defaultNow().notNull(),

		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index("role_requests_user_id_idx").on(table.userId),
		index("role_requests_status_idx").on(table.status),
	],
);
