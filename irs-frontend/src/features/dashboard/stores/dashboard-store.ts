import { create } from "zustand";

export type DashboardView =
	| "onboarding"
	| "profile"
	| "request"
	| "reports"
	| null;

type DashboardState = {
	/** Currently active sidebar menu item; null = nothing selected yet. */
	activeView: DashboardView;
	setActiveView: (view: DashboardView) => void;
};

/**
 * Sidebar-driven dashboard state. The sidebar sets `activeView` on click
 * and the dashboard main area renders the matching component from a
 * registry, so menu + content stay in sync without route changes.
 */
export const useDashboardStore = create<DashboardState>((set) => ({
	activeView: null,
	setActiveView: (view) => set({ activeView: view }),
}));
