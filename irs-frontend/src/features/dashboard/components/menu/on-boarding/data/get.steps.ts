import { useQuery } from "@tanstack/react-query";
import { env } from "@/shared/config/env";
import type { ApiResponse } from "@/shared/model/api-reponse";

export type OnboardingStepData = {
	id: number;
	title: string;
	description: string;
	stepOrder: number;
	createdAt: string;
};

async function getOnboardingSteps(): Promise<
	ApiResponse<OnboardingStepData[]>
> {
	const response = await fetch(`${env.VITE_API_URL}/api/v1/onboarding/steps`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch onboarding steps");
	}

	return response.json();
}

export function useGetOnboardingSteps() {
	return useQuery({
		queryKey: ["onboarding", "steps"],
		queryFn: getOnboardingSteps,
		staleTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
}
