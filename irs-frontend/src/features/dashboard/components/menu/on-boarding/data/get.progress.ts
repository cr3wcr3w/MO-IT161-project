import { useQuery } from "@tanstack/react-query";
import type { OnboardingStepData } from "./get.steps";

export type OnboardingProgressData = {
	currentStep: OnboardingStepData | null;
	completedAt: string | null;
};

export type OnboardingProgressResponse = {
	data: OnboardingProgressData | null;
	message: string;
};

async function getOnboardingProgress(): Promise<OnboardingProgressResponse> {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/api/v1/onboarding/progress`,
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
