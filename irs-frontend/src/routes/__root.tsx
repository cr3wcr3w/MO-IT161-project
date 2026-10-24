import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import NotFound from "@/features/not-found";
import { Toaster } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import "../shared/styles/main.css";

const queryClient = new QueryClient();

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: () => <NotFound />,
});

function RootComponent() {
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Outlet />

				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "TanStack Query",
							render: <ReactQueryDevtoolsPanel />,
						},
						{
							name: "TanStack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>

				<Toaster position="top-right" />
			</TooltipProvider>
		</QueryClientProvider>
	);
}
