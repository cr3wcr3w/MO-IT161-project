import { env } from "@/shared/config/env";
import type { ApiResponse } from "@/shared/model/api-reponse";
import type { RoleRequestAllData } from "./get-role-request-all";

type PatchRoleRequestStatusInput = {
	id: string;
	status: RoleRequestAllData["status"];
};

export const patchRoleRequestStatus = async ({
	id,
	status,
}: PatchRoleRequestStatusInput): Promise<ApiResponse<RoleRequestAllData>> => {
	const response = await fetch(
		`${env.VITE_API_URL}/api/v1/auth/role-requests/${id}/status`,
		{
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ status }),
		},
	);

	const result: ApiResponse<RoleRequestAllData> = await response.json();

	if (!response.ok) {
		throw new Error(result.message || "Failed to update role request status");
	}

	return result;
};
