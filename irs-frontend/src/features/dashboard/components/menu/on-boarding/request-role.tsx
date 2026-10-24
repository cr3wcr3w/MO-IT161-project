import { CheckCircle2, Clock, RefreshCw, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { useSession } from "@/shared/lib/auth-client";
import {
	getRoleRequests,
	type RequestedRole,
	type RoleRequest,
} from "./data/get.roleRequest";
import { postRoleRequest } from "./data/post.roleRequest";
import type { OnboardingStepComponentProps } from "./onboarding-stepper";

export function RequestRole({
	onFormCompletedChange,
}: OnboardingStepComponentProps) {
	const { data: session, isPending: isSessionPending } = useSession();

	const [requestedRole, setRequestedRole] = useState<RequestedRole>("triage");
	const [requests, setRequests] = useState<RoleRequest[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const pendingRequest =
		requests.find((request) => request.status === "pending") ?? null;

	const latestRequest = requests[0] ?? null;

	const isApproved = requests.some((request) => request.status === "approved");

	const fetchRoleRequests = useCallback(async () => {
		await getRoleRequests(setIsLoading, setRequests);
	}, []);

	const handleRefresh = useCallback(async () => {
		setIsRefreshing(true);

		try {
			await fetchRoleRequests();
		} finally {
			setIsRefreshing(false);
		}
	}, [fetchRoleRequests]);

	useEffect(() => {
		if (isSessionPending) return;

		if (!session) {
			setIsLoading(false);
			return;
		}

		void fetchRoleRequests();
	}, [isSessionPending, session, fetchRoleRequests]);

	useEffect(() => {
		onFormCompletedChange(isApproved);
	}, [isApproved, onFormCompletedChange]);

	if (isSessionPending || isLoading) {
		return (
			<p className="text-sm text-muted-foreground">
				Loading your role request...
			</p>
		);
	}

	if (!session) {
		return (
			<p className="text-sm text-destructive">
				Unable to retrieve your account. Please sign in again.
			</p>
		);
	}

	return (
		<div className="max-w-md space-y-6">
			<div className="flex items-start gap-3">
				<div className="rounded-lg bg-muted p-3">
					<ShieldCheck className="size-5" />
				</div>

				<div className="min-w-0 flex-1 space-y-1">
					<h2 className="text-xl font-semibold">Request an account role</h2>

					<p className="text-sm text-muted-foreground">
						Choose the role you need for the Incident Reporting System. An
						administrator will review your request.
					</p>
				</div>

				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={handleRefresh}
					disabled={isRefreshing || isSubmitting}
				>
					<RefreshCw
						className={`mr-2 size-4 ${isRefreshing ? "animate-spin" : ""}`}
					/>
					{isRefreshing ? "Refreshing..." : "Refresh status"}
				</Button>
			</div>

			{pendingRequest ? (
				<div className="flex items-start gap-3 rounded-lg border p-4">
					<Clock className="mt-0.5 size-5 text-amber-600" />

					<div className="min-w-0 flex-1 space-y-1">
						<h3 className="font-semibold">Role request pending</h3>

						<p className="text-sm text-muted-foreground">
							Requested role:{" "}
							<span className="font-medium capitalize text-foreground">
								{pendingRequest.requestedRole}
							</span>
						</p>

						<p className="text-sm text-muted-foreground">
							Your request is awaiting administrator approval.
						</p>
					</div>
				</div>
			) : latestRequest?.status === "approved" ? (
				<div className="flex items-start gap-3 rounded-lg border p-4">
					<CheckCircle2 className="mt-0.5 size-5 text-green-600" />

					<div className="space-y-1">
						<h3 className="font-semibold">Role request approved</h3>

						<p className="text-sm text-muted-foreground">
							Your request for{" "}
							<span className="font-medium capitalize text-foreground">
								{latestRequest.requestedRole}
							</span>{" "}
							has been approved.
						</p>
					</div>
				</div>
			) : latestRequest?.status === "rejected" ? (
				<div className="space-y-2 rounded-lg border border-destructive/30 p-4">
					<p className="font-semibold text-destructive">
						Role request rejected
					</p>

					<p className="text-sm text-muted-foreground">
						Your request for{" "}
						<span className="font-medium capitalize text-foreground">
							{latestRequest.requestedRole}
						</span>{" "}
						was rejected by an administrator.
					</p>

					<p className="text-sm text-muted-foreground">
						Kindly email the administrator at{" "}
						<a
							href="mailto:admin@example.com"
							className="font-medium text-primary underline underline-offset-4"
						>
							admin@example.com
						</a>{" "}
						for assistance.
					</p>
				</div>
			) : (
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="requested-role">Select a role</Label>

						<select
							id="requested-role"
							value={requestedRole}
							onChange={(event) =>
								setRequestedRole(event.target.value as RequestedRole)
							}
							disabled={isSubmitting}
							className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						>
							<option value="triage">Triage</option>
							<option value="researcher">Researcher</option>
						</select>

						<p className="text-sm text-muted-foreground">
							Your selected role will require administrator approval.
						</p>
					</div>

					<Button
						className="w-full"
						onClick={() => {
							postRoleRequest({
								isSubmitting,
								pendingRequest,
								isApproved,
								latestRequest,
								setIsSubmitting,
								requestedRole,
								setRequests,
								fetchRoleRequests,
							});
						}}
						disabled={isSubmitting}
					>
						{isSubmitting ? "Submitting request..." : "Submit Role Request"}
					</Button>
				</div>
			)}

			{isRefreshing && (
				<p className="text-center text-xs text-muted-foreground">
					Checking your latest request status...
				</p>
			)}
		</div>
	);
}
