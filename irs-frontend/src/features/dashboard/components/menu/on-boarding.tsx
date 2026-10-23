import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useGetOnboardingProgress } from "./on-boarding/data/get.progress";
import { useGetOnboardingSteps } from "./on-boarding/data/get.steps";
import { useUpdateOnboardingProgress } from "./on-boarding/data/patch.progress";
import { OnboardingStepper } from "./on-boarding/onboarding-stepper";
import { RequestRole } from "./on-boarding/request-role";
import { VerifyEmail } from "./on-boarding/verify-email";

export function OnBoarding() {
	const stepsQuery = useGetOnboardingSteps();
	const progressQuery = useGetOnboardingProgress();
	const updateProgress = useUpdateOnboardingProgress();

	const allSteps = stepsQuery.data?.data ?? [];
	const progress = progressQuery.data?.data;
	const currentStep = progress?.currentStep?.stepOrder ?? 1;
	const isCompleted = Boolean(progress?.completedAt);

	async function handleContinue(stepId: number) {
		try {
			await updateProgress.mutateAsync({ stepId });
			toast.success("Onboarding progress updated");
		} catch {
			toast.error("Failed to update onboarding progress");
			throw new Error("Failed to update onboarding progress");
		}
	}

	if (stepsQuery.isPending || progressQuery.isPending) {
		return <p>Loading onboarding...</p>;
	}

	if (stepsQuery.isError) {
		return <p>{stepsQuery.error.message}</p>;
	}

	if (progressQuery.isError) {
		return <p>{progressQuery.error.message}</p>;
	}

	if (allSteps.length === 0) {
		return <p>No onboarding steps are configured.</p>;
	}

	return (
		<div className="space-y-8 p-6 md:p-8">
			<section className="space-y-8 rounded-2xl border bg-card p-6 md:p-8">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tight">
						Account Onboarding
					</h1>
					<p className="text-muted-foreground">
						Complete the following steps to set up your account.
					</p>
				</div>

				{isCompleted ? (
					<div className="flex flex-col items-center gap-4 rounded-xl border bg-muted/30 px-6 py-12 text-center">
						<CheckCircle2 className="size-14 text-green-600" />
						<h2 className="text-2xl font-semibold">Onboarding Completed!</h2>
						<p className="max-w-md text-muted-foreground">
							Your account onboarding is complete. You're all set!
						</p>
					</div>
				) : (
					<OnboardingStepper
						allStep={allSteps}
						currentStep={currentStep}
						components={{ VerifyEmail, RequestRole }}
						onContinue={handleContinue}
					/>
				)}
			</section>
		</div>
	);
}
