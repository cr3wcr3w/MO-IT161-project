import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { authClient } from "@/shared/lib/auth-client";

export const Route = createFileRoute("/dashboard")({
	beforeLoad: async () => {
		const { data: session } = await authClient.getSession();

		if (!session) {
			throw redirect({ to: "/signin" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const { data: session } = authClient.useSession();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		setIsLoggingOut(true);

		try {
			await authClient.signOut();
			await navigate({ to: "/signin" });
		} finally {
			setIsLoggingOut(false);
		}
	};

	return (
		<main className="flex min-h-svh items-center justify-center p-6">
			<div className="w-full max-w-md space-y-4 rounded-lg border p-6">
				<h1 className="text-2xl font-bold">Dashboard</h1>

				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">
						Currently logged in as
					</p>
					<p className="text-sm text-muted-foreground">{session?.user.email}</p>
				</div>

				<Button
					className="w-full"
					variant="destructive"
					onClick={handleLogout}
					disabled={isLoggingOut}
				>
					{isLoggingOut ? "Logging out..." : "Logout"}
				</Button>
			</div>
		</main>
	);
}
