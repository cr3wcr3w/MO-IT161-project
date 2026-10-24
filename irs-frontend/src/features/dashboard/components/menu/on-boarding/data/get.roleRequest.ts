import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { env } from "@/shared/config/env";
import type { ApiResponse } from "@/shared/model/api-reponse";

export type RequestedRole = "triage" | "researcher";

export type RoleRequest = {
	id: string;
	requestedRole: RequestedRole;
	status: "pending" | "approved" | "rejected";
	createdAt: string;
};

export const getRoleRequests = async (
	setIsLoading: Dispatch<SetStateAction<boolean>>,
	setRequests: Dispatch<SetStateAction<RoleRequest[]>>,
) => {
	try {
		setIsLoading(true);

		const response = await fetch(
			`${env.VITE_API_URL}/api/v1/auth/role-requests/me`,
			{
				method: "GET",
				credentials: "include",
			},
		);

		const result: ApiResponse<RoleRequest[]> = await response.json();

		if (!response.ok) {
			throw new Error(result.message || "Failed to fetch role requests.");
		}

		setRequests(result.data ?? []);
	} catch (error) {
		toast.error(
			error instanceof Error
				? error.message
				: "Failed to load your role requests.",
		);
	} finally {
		setIsLoading(false);
	}
};
