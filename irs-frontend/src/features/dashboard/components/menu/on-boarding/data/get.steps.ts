import { useQuery } from "@tanstack/react-query";

export type OnboardingStepData = {
	id: number;
	title: string;
	description: string;
	stepOrder: number;
	createdAt: string;
};

export type OnboardingStepsResponse = {
	data: OnboardingStepData[];
	message: string;
};

async function getOnboardingSteps(): Promise<OnboardingStepsResponse> {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/api/v1/onboarding/steps`,
		{
			credentials: "include",
		},
	);

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
