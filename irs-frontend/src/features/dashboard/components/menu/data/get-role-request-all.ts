import { useQuery } from "@tanstack/react-query";
import { env } from "@/shared/config/env";
import type { ApiResponse } from "@/shared/model/api-reponse";

export type RoleRequestAllData = {
	id: string;
	userEmail: string;
	requestedRole: "triage" | "researcher";
	status: "pending" | "approved" | "rejected";
	reviewedBy: string | null;
	createdAt: string;
	updatedAt: string;
};

async function getRoleRequestAll(): Promise<ApiResponse<RoleRequestAllData[]>> {
	const response = await fetch(
		`${env.VITE_API_URL}/api/v1/auth/role-requests/all`,
		{
			credentials: "include",
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch onboarding progress");
	}

	return response.json();
}

export function useGetRoleRequestAll() {
	return useQuery({
		queryKey: ["onboarding", "roleReuqestAll"],
		queryFn: getRoleRequestAll,
		staleTime: 30 * 1000,
	});
}
