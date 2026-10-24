import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type ColumnDef,
	createSortedRowModel,
	rowSortingFeature,
	tableFeatures,
	useTable,
} from "@tanstack/react-table";
import { useTanStackTableDevtools } from "@tanstack/react-table-devtools";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/shared/components/ui/dialog";
import type { RoleRequestAllData } from "./data/get-role-request-all";
import { useGetRoleRequestAll } from "./data/get-role-request-all";
import { patchRoleRequestStatus } from "./data/patch-role-request-status";

type RequestStatus = RoleRequestAllData["status"];

const statusStyles: Record<RequestStatus, string> = {
	pending: "bg-yellow-100 text-yellow-800",
	approved: "bg-green-100 text-green-800",
	rejected: "bg-red-100 text-red-800",
};

const features = tableFeatures({
	rowSortingFeature,
	sortedRowModel: createSortedRowModel(),
});

export function Request() {
	const { data, isLoading, isError, error, refetch, isFetching } =
		useGetRoleRequestAll();

	const queryClient = useQueryClient();

	const [selectedRequest, setSelectedRequest] =
		useState<RoleRequestAllData | null>(null);

	const [selectedStatus, setSelectedStatus] =
		useState<RequestStatus>("pending");

	const updateStatusMutation = useMutation({
		mutationFn: patchRoleRequestStatus,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["onboarding", "roleRequestAll"],
			});

			setSelectedRequest(null);
		},
	});

	const requests = data?.data ?? [];

	const columns: ColumnDef<typeof features, RoleRequestAllData>[] = [
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => (
				<button
					type="button"
					className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
					onClick={() => {
						setSelectedRequest(row.original);
						setSelectedStatus(row.original.status);
						updateStatusMutation.reset();
					}}
				>
					Change status
				</button>
			),
		},
		{
			accessorKey: "userEmail",
			header: "User email",
		},
		{
			accessorKey: "requestedRole",
			header: "Requested role",
			cell: ({ row }) => (
				<span className="capitalize">{row.original.requestedRole}</span>
			),
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => (
				<span
					className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
						statusStyles[row.original.status]
					}`}
				>
					{row.original.status}
				</span>
			),
		},
		{
			accessorKey: "reviewedBy",
			header: "Reviewed by",
			cell: ({ row }) => row.original.reviewedBy ?? "—",
		},
		{
			accessorKey: "createdAt",
			header: "Created at",
			cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
		},
	];

	const table = useTable({
		key: "role-requests",
		features,
		columns,
		data: requests,
	});

	useTanStackTableDevtools(table);

	async function handleSaveStatus() {
		if (!selectedRequest) return;

		try {
			await updateStatusMutation.mutateAsync({
				id: selectedRequest.id,
				status: selectedStatus,
			});

			await refetch();
		} catch (error) {
			console.error("Failed to update role request status:", error);
		}
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<p className="text-sm text-muted-foreground">
					Loading role requests...
				</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="space-y-3 py-8">
				<p className="text-sm text-destructive">
					{error.message || "Failed to load role requests."}
				</p>

				<button
					type="button"
					className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
					onClick={() => refetch()}
					disabled={isFetching}
				>
					{isFetching ? "Retrying..." : "Try again"}
				</button>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-semibold">Role Requests</h2>
					<p className="text-sm text-muted-foreground">
						Review and manage user role requests.
					</p>
				</div>

				<button
					type="button"
					className="rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
					onClick={() => refetch()}
					disabled={isFetching}
				>
					{isFetching ? "Refreshing..." : "Refresh"}
				</button>
			</div>

			<div className="overflow-x-auto rounded-md border">
				<table className="w-full text-sm">
					<thead className="border-b bg-muted/50">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="whitespace-nowrap px-4 py-3 text-left font-medium"
									>
										{header.isPlaceholder ? null : (
											<button
												type="button"
												className="inline-flex items-center gap-1"
												onClick={header.column.getToggleSortingHandler()}
												disabled={!header.column.getCanSort()}
											>
												{table.FlexRender({
													header,
												})}

												{{
													asc: " ↑",
													desc: " ↓",
												}[header.column.getIsSorted() as "asc" | "desc"] ?? ""}
											</button>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody className="divide-y">
						{requests.length === 0 ? (
							<tr>
								<td
									colSpan={columns.length}
									className="px-4 py-10 text-center text-muted-foreground"
								>
									No role requests found.
								</td>
							</tr>
						) : (
							table.getRowModel().rows.map((row) => (
								<tr key={row.id} className="hover:bg-muted/30">
									{row.getAllCells().map((cell) => (
										<td key={cell.id} className="whitespace-nowrap px-4 py-3">
											{table.FlexRender({ cell })}
										</td>
									))}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			<Dialog
				open={selectedRequest !== null}
				onOpenChange={(open) => {
					if (!open && !updateStatusMutation.isPending) {
						setSelectedRequest(null);
						updateStatusMutation.reset();
					}
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Change role request status</DialogTitle>
						<DialogDescription>
							{selectedRequest
								? `Update the status for ${selectedRequest.userEmail}.`
								: "Select a status for this role request."}
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-2">
						<label htmlFor="request-status" className="text-sm font-medium">
							Status
						</label>

						<select
							id="request-status"
							className="w-full rounded-md border bg-background px-3 py-2 text-sm"
							value={selectedStatus}
							onChange={(event) =>
								setSelectedStatus(event.target.value as RequestStatus)
							}
							disabled={updateStatusMutation.isPending}
						>
							<option value="pending">Pending</option>
							<option value="approved">Approved</option>
							<option value="rejected">Rejected</option>
						</select>
					</div>

					{updateStatusMutation.isError && (
						<p className="text-sm text-destructive">
							{updateStatusMutation.error.message ||
								"Failed to update role request status."}
						</p>
					)}

					<DialogFooter>
						<button
							type="button"
							className="rounded-md border px-4 py-2 text-sm hover:bg-muted disabled:opacity-50"
							onClick={() => setSelectedRequest(null)}
							disabled={updateStatusMutation.isPending}
						>
							Cancel
						</button>

						<button
							type="button"
							className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-50"
							onClick={handleSaveStatus}
							disabled={
								!selectedRequest ||
								updateStatusMutation.isPending ||
								selectedStatus === selectedRequest.status
							}
						>
							{updateStatusMutation.isPending ? "Saving..." : "Save changes"}
						</button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
