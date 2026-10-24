import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "@/shared/config/env";
import type { ApiResponse } from "@/shared/model/api-reponse";

export type UpdateOnboardingProgressPayload = {
	stepId: number;
};

async function updateOnboardingProgress(
	payload: UpdateOnboardingProgressPayload,
): Promise<ApiResponse<unknown>> {
	const response = await fetch(
		`${env.VITE_API_URL}/api/v1/onboarding/progress`,
		{
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		},
	);

	if (!response.ok) {
		throw new Error("Failed to update onboarding progress");
	}

	return response.json();
}

export function useUpdateOnboardingProgress() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateOnboardingProgress,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ["onboarding", "progress"],
				}),
				queryClient.invalidateQueries({
					queryKey: ["onboarding", "steps"],
				}),
			]);
		},
	});
}
