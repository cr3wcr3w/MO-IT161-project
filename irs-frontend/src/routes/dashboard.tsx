import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardSkeleton } from "@/features/dashboard/components/dashboard-skeleton";
import { DefaultContent } from "@/features/dashboard/components/menu/default-content";
import { DASHBOARD_VIEWS } from "@/features/dashboard/components/views";
import { useDashboardStore } from "@/features/dashboard/stores/dashboard-store";
import { AppSidebar } from "@/shared/components/ui/app-sidebar";
import {
	SidebarProvider,
	SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { useProfile } from "@/shared/hooks/use-profile";
import { authClient } from "@/shared/lib/auth-client";

export const Route = createFileRoute("/dashboard")({
	beforeLoad: async () => {
		const { data: session } = await authClient.getSession();
		console.log(session?.user?.isOnboardingComplete);
		if (!session) {
			throw redirect({ to: "/signin" });
		}

		return {
			isOnboardingComplete: Boolean(session.user.isOnboardingComplete),
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { isOnboardingComplete } = Route.useRouteContext();
	const { profile, nav } = useProfile(isOnboardingComplete);
	const { activeView } = useDashboardStore();

	console.log(nav);

	const View = profile && activeView ? DASHBOARD_VIEWS[activeView] : null;
	const activeLabel = nav.items.find((i) => i.view === activeView)?.label;

	return (
		<SidebarProvider>
			<AppSidebar nav={nav} />
			<main className="flex h-svh min-w-0 flex-1 flex-col overflow-hidden bg-background">
				{/* Top bar: sidebar trigger + current menu label, like a breadcrumb */}
				<header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
					<SidebarTrigger className="cursor-pointer" />
					<div className="h-5 w-px bg-border" aria-hidden="true" />
					<span className="text-sm font-medium text-muted-foreground">
						{activeLabel ?? "Dashboard"}
					</span>
				</header>

				<div className="flex-1 overflow-y-auto">
					{!profile ? (
						<DashboardSkeleton />
					) : View ? (
						<View />
					) : (
						<DefaultContent />
					)}
				</div>
			</main>
		</SidebarProvider>
	);
}
