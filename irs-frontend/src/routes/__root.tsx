import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import NotFound from "@/features/not-found";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import "../shared/styles/main.css";
import { Toaster } from "@/shared/components/ui/sonner";

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

				<ReactQueryDevtools initialIsOpen={false} />

				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "TanStack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
			</TooltipProvider>
			<Toaster position="top-right" />
		</QueryClientProvider>
	);
}
