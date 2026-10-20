import type { ComponentType } from "react";
import type { DashboardView } from "../stores/dashboard-store";
import { OnBoarding } from "./menu/on-boarding";
import { Profile } from "./menu/profile";
import { Reports } from "./menu/reports";
import { Request } from "./menu/request";

/**
 * Maps each sidebar view key to its content component.
 * Add new dashboard views here and they become available to any role menu.
 */
export const DASHBOARD_VIEWS: Record<
	Exclude<DashboardView, null>,
	ComponentType
> = {
	onboarding: OnBoarding,
	request: Request,
	reports: Reports,
	profile: Profile,
};
