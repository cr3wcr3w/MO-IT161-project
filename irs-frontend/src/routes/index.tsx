import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowDown,
	ArrowRight,
	ClipboardList,
	FileSearch,
	ShieldCheck,
} from "lucide-react";
import { AnomalousMatterHero } from "@/features/home/components/anomalous-matter-hero";

export const Route = createFileRoute("/")({
	component: Home,
});

const features = [
	{
		icon: ClipboardList,
		number: "01",
		title: "Report an Incident",
		description:
			"Submit incident details through a structured reporting process. Capture the information needed to start an investigation.",
	},
	{
		icon: FileSearch,
		number: "02",
		title: "Review & Investigate",
		description:
			"Give authorized personnel a centralized place to review reports, examine details, and coordinate follow-up actions.",
	},
	{
		icon: ShieldCheck,
		number: "03",
		title: "Track Resolution",
		description:
			"Monitor incident statuses and follow reports from initial submission through resolution.",
	},
];

function Home() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<nav className="absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-12">
				<Link to="/" className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
						<ShieldCheck className="size-5 text-primary" />
					</div>
					<div>
						<p className="font-semibold tracking-wide text-white/60">IRS</p>
						<p className="text-xs text-white/60">Incident Reporting System</p>
					</div>
				</Link>

				<div className="flex items-center gap-3">
					<Link
						to="/signin"
						className="rounded-lg px-4 py-2 text-sm font-medium text-white/80 transition hover:text-primary"
					>
						Sign in
					</Link>
					<Link
						to="/signup"
						className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
					>
						Get started <ArrowRight className="ml-1 inline size-4" />
					</Link>
				</div>
			</nav>

			<AnomalousMatterHero
				title="INCIDENT REPORTING SYSTEM"
				subtitle="Every incident matters. Every detail counts."
				description="A centralized platform for reporting, reviewing, and tracking incidents. Turn incoming reports into organized information and actionable responses."
			/>

			<section className="border-b border-border px-6 py-16 md:px-12">
				<div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
					<div>
						<p className="font-mono text-xs tracking-[0.25em] text-primary">
							BUILT FOR ACCOUNTABILITY
						</p>
						<h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight md:text-4xl">
							From incident submission to informed action.
						</h2>
						<p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
							Keep incident information organized, make report statuses easier
							to follow, and help authorized teams work from a shared source of
							information.
						</p>
					</div>

					<a
						href="#workflow"
						className="inline-flex w-fit items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium transition hover:border-primary/50 hover:text-primary"
					>
						Explore the workflow <ArrowDown className="size-4" />
					</a>
				</div>
			</section>

			<section id="workflow" className="px-6 py-20 md:px-12 md:py-28">
				<div className="mx-auto max-w-6xl">
					<div className="max-w-2xl">
						<p className="font-mono text-xs tracking-[0.25em] text-primary">
							HOW IT WORKS
						</p>
						<h2 className="mt-4 text-3xl font-bold md:text-5xl">
							A clearer path to resolution.
						</h2>
						<p className="mt-5 leading-7 text-muted-foreground">
							A straightforward workflow designed to help teams handle incident
							information consistently.
						</p>
					</div>

					<div className="mt-12 grid gap-4 md:grid-cols-3">
						{features.map((feature) => {
							const Icon = feature.icon;

							return (
								<article
									key={feature.number}
									className="group rounded-2xl border border-border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
								>
									<div className="flex items-center justify-between">
										<span className="font-mono text-sm text-primary">
											/{feature.number}
										</span>
										<Icon className="size-5 text-muted-foreground transition group-hover:text-primary" />
									</div>
									<h3 className="mt-10 text-xl font-semibold">
										{feature.title}
									</h3>
									<p className="mt-3 text-sm leading-6 text-muted-foreground">
										{feature.description}
									</p>
								</article>
							);
						})}
					</div>
				</div>
			</section>

			<section className="px-6 pb-20 md:px-12 md:pb-28">
				<div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-2xl border border-primary/20 bg-primary/5 p-8 md:flex-row md:items-center md:p-12">
					<div className="max-w-xl">
						<p className="font-mono text-xs tracking-[0.2em] text-primary">
							READY TO GET STARTED?
						</p>
						<h2 className="mt-4 text-2xl font-bold md:text-3xl">
							Make every report count.
						</h2>
						<p className="mt-3 text-sm leading-6 text-muted-foreground">
							Sign in to access your workspace and continue to your assigned
							reporting tools.
						</p>
					</div>

					<Link
						to="/signin"
						className="shrink-0 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
					>
						Access your workspace <ArrowRight className="ml-2 inline size-4" />
					</Link>
				</div>
			</section>

			<footer className="border-t border-border px-6 py-6 md:px-12">
				<div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
					<p>IRS — Incident Reporting System</p>
					<p>Structured reporting. Accountable response.</p>
				</div>
			</footer>
		</main>
	);
}
