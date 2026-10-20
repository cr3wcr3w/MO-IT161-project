import {
	ClipboardList,
	FileWarning,
	LogOut,
	type LucideIcon,
	ShieldAlert,
	UserRound,
} from "lucide-react";

export type RoleName = "admin" | "triage" | "researcher" | "guest";

export type NavItem = {
	label: string;
	/** Key into the dashboard view registry (features/dashboard/model/dashboard-views.tsx). */
	view: "onboarding" | "profile" | "request" | "reports";
	icon: LucideIcon;
};

export type NavConfig = {
	items: NavItem[];
};

/**
 * Sidebar menu + main content per role.
 * Every role gets a LogOut entry pinned at the bottom of the sidebar (footer).
 */
export const NAV_BY_ROLE: Record<RoleName, NavConfig> = {
	guest: {
		items: [{ label: "Onboarding", view: "onboarding", icon: UserRound }],
	},
	admin: {
		items: [
			{ label: "Profile", view: "profile", icon: UserRound },
			{ label: "Request", view: "request", icon: ClipboardList },
		],
	},
	triage: {
		items: [
			{ label: "Reports", view: "reports", icon: ShieldAlert },
			{ label: "Profile", view: "profile", icon: UserRound },
		],
	},
	researcher: {
		items: [
			{ label: "Reports", view: "reports", icon: FileWarning },
			{ label: "Profile", view: "profile", icon: UserRound },
		],
	},
};

/** Footer entry shared by every role. */
export const LOGOUT_ITEM: NavItem = {
	label: "Logout",
	view: "onboarding",
	icon: LogOut,
};

export const FALLBACK_NAV: NavConfig = {
	items: [],
};
