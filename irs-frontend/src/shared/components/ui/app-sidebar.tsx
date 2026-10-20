import { useNavigate } from "@tanstack/react-router";
import {
	type DashboardView,
	useDashboardStore,
} from "@/features/dashboard/stores/dashboard-store";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { authClient, signOut } from "@/shared/lib/auth-client";
import { LOGOUT_ITEM, type NavConfig } from "@/shared/model/nav-config";

export function AppSidebar({ nav }: { nav: NavConfig }) {
	const { activeView, setActiveView } = useDashboardStore();
	const { data: session } = authClient.useSession();
	const email = session?.user?.email;
	const navigate = useNavigate();

	const handleSignOut = async () => {
		setActiveView(null);
		await signOut();
		await navigate({
			to: "/",
			replace: true,
		});
	};

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<div className="flex min-w-0 flex-col px-2 py-1">
							<span className="truncate text-sm font-semibold">
								{email ? `Hello, ${email}` : "Hello"}
							</span>
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu className="gap-2">
							{nav.items.map((item) => (
								<SidebarMenuItem key={item.view}>
									<SidebarMenuButton
										isActive={activeView === item.view}
										onClick={() => setActiveView(item.view as DashboardView)}
										tooltip={item.label}
										className="cursor-pointer hover:ring-2 hover:ring-sidebar-foreground/10 data-active:ring-2 data-active:ring-sidebar-foreground/20 transition-transform duration-150"
									>
										<item.icon />
										<span>{item.label}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu className="gap-2">
					<SidebarMenuItem>
						<SidebarMenuButton
							onClick={handleSignOut}
							tooltip={LOGOUT_ITEM.label}
							className="cursor-pointer hover:ring-2 hover:ring-sidebar-foreground/10 data-active:ring-2 data-active:ring-sidebar-foreground/20 transition-transform duration-150"
						>
							<LOGOUT_ITEM.icon />
							<span>{LOGOUT_ITEM.label}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
