import { useQuery } from "@tanstack/react-query";
import { env } from "@/shared/config/env";
import type { ApiResponse } from "@/shared/model/api-reponse";
import type { OnboardingStepData } from "./get.steps";

export type OnboardingProgressData = {
	currentStep: OnboardingStepData | null;
	completedAt: string | null;
};

async function getOnboardingProgress(): Promise<
	ApiResponse<OnboardingProgressData>
> {
	const response = await fetch(
		`${env.VITE_API_URL}/api/v1/onboarding/progress`,
		{
			credentials: "include",
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch onboarding progress");
	}

	return response.json();
}

export function useGetOnboardingProgress() {
	return useQuery({
		queryKey: ["onboarding", "progress"],
		queryFn: getOnboardingProgress,
		staleTime: 30 * 1000,
	});
}
