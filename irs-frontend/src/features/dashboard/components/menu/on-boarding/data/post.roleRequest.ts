import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { env } from "@/shared/config/env";
import type { ApiResponse } from "@/shared/model/api-reponse";
import type { RequestedRole, RoleRequest } from "./get.roleRequest";

export const postRoleRequest = async ({
	isSubmitting,
	pendingRequest,
	isApproved,
	latestRequest,
	setIsSubmitting,
	requestedRole,
	setRequests,
	fetchRoleRequests,
}: {
	isSubmitting: boolean;
	pendingRequest: RoleRequest | null;
	isApproved: boolean;
	latestRequest: RoleRequest | null;
	setIsSubmitting: Dispatch<SetStateAction<boolean>>;
	requestedRole: RequestedRole;
	setRequests: Dispatch<SetStateAction<RoleRequest[]>>;
	fetchRoleRequests: () => void;
}) => {
	if (isSubmitting || pendingRequest || isApproved || latestRequest) {
		return;
	}

	setIsSubmitting(true);

	try {
		const response = await fetch(
			`${env.VITE_API_URL}/api/v1/auth/role-requests`,
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ requestedRole }),
			},
		);

		const result: ApiResponse<RoleRequest> = await response.json();

		if (!response.ok) {
			throw new Error(result.message || "Failed to submit role request.");
		}

		if (!result.data) {
			throw new Error("The server did not return the submitted request.");
		}

		setRequests((current) => [result.data as RoleRequest, ...current]);

		toast.success("Role request submitted successfully.");
	} catch (error) {
		toast.error(
			error instanceof Error
				? error.message
				: "Something went wrong while submitting your request.",
		);

		await fetchRoleRequests();
	} finally {
		setIsSubmitting(false);
	}
};
