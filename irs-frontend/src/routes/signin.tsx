import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignInForm } from "@/features/signin/components/signin-form";
import { authClient } from "@/shared/lib/auth-client";

export const Route = createFileRoute("/signin")({
	beforeLoad: async () => {
		const { data: session } = await authClient.getSession();

		if (session) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-slate-200">
			<div className="w-full max-w-sm">
				<SignInForm />
			</div>
		</main>
	);
}
