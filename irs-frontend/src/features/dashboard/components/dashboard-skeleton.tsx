import { Skeleton } from "@/shared/components/ui/skeleton";

export function DashboardSkeleton() {
	return (
		<div className="flex flex-col gap-4 p-8">
			<Skeleton className="h-8 w-48" />
			<Skeleton className="h-4 w-64" />
			<div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<Skeleton className="h-32 rounded-xl" />
				<Skeleton className="h-32 rounded-xl" />
				<Skeleton className="h-32 rounded-xl" />
			</div>
			<Skeleton className="h-64 rounded-xl" />
		</div>
	);
}
