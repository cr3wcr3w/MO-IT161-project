import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center px-6 text-center bg-slate-200">
			<h1 className="mt-4 text-7xl font-bold tracking-tight">404</h1>

			<h2 className="mt-4 text-2xl font-semibold">Page not found</h2>

			<p className="mt-2 max-w-md text-muted-foreground">
				Sorry, we couldn't find the page you're looking for. It may have been
				moved or doesn't exist.
			</p>

			<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
				<Link
					to="/"
					className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
				>
					<Home className="mr-2 size-4" />
					Go home
				</Link>

				<Button variant="outline" onClick={() => window.history.back()}>
					<ArrowLeft className="mr-2 size-4" />
					Go back
				</Button>
			</div>
		</main>
	);
}
