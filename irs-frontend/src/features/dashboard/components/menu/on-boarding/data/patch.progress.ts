import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateOnboardingProgressPayload = {
	stepId: number;
};

export type UpdateOnboardingProgressResponse = {
	data: unknown;
	message: string;
};

async function updateOnboardingProgress(
	payload: UpdateOnboardingProgressPayload,
): Promise<UpdateOnboardingProgressResponse> {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/api/v1/onboarding/progress`,
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
