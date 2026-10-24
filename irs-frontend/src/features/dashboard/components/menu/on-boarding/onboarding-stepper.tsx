import { Check, Circle } from "lucide-react";
import type { ComponentType } from "react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import type { OnboardingStepData } from "./data/get.steps";

export type OnboardingStepComponentProps = {
	onFormCompletedChange: (isCompleted: boolean) => void;
};

type OnboardingStepperProps = {
	allStep: OnboardingStepData[];
	currentStep: number;
	components: Record<string, ComponentType<OnboardingStepComponentProps>>;
	onContinue: (stepId: number) => Promise<void>;
};

export function OnboardingStepper({
	allStep,
	currentStep,
	components,
	onContinue,
}: OnboardingStepperProps) {
	const [isContinuing, setIsContinuing] = useState(false);
	const [isFormCompleted, setIsFormCompleted] = useState(false);

	const activeStep = allStep.find((step) => step.stepOrder === currentStep);

	const componentName =
		activeStep?.stepOrder === 1
			? "VerifyEmail"
			: activeStep?.stepOrder === 2
				? "RequestRole"
				: undefined;

	const ActiveComponent = componentName ? components[componentName] : undefined;

	const nextStep = allStep.find((step) => step.stepOrder === currentStep + 1);

	const isLastStep = !nextStep;

	async function handleContinue() {
		if (!activeStep || isContinuing || !isFormCompleted) return;

		setIsContinuing(true);

		try {
			await onContinue(nextStep?.id ?? activeStep.id);

			// Reset the form-completion state for the next step.
			setIsFormCompleted(false);
		} finally {
			setIsContinuing(false);
		}
	}

	if (!activeStep || !ActiveComponent) {
		return <p>Onboarding step not found.</p>;
	}

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{allStep.map((step) => {
					const isCurrent = step.stepOrder === currentStep;
					const isPast = step.stepOrder < currentStep;

					return (
						<div
							key={step.id}
							className={`rounded-xl border p-4 transition-colors ${
								isCurrent
									? "border-primary bg-accent"
									: isPast
										? "border-green-600/30 bg-green-500/5"
										: "bg-card"
							}`}
						>
							<div className="mb-2 flex items-center justify-between">
								<p className="text-sm text-muted-foreground">
									Step {step.stepOrder}
								</p>

								{isPast ? (
									<Check className="size-4 text-green-600" />
								) : isCurrent ? (
									<Circle className="size-4 text-primary" />
								) : null}
							</div>

							<h3 className="font-semibold">{step.title}</h3>
							<p className="mt-1 text-sm text-muted-foreground">
								{step.description}
							</p>
						</div>
					);
				})}
			</div>

			<div className="space-y-6 rounded-xl border bg-card p-6">
				<ActiveComponent onFormCompletedChange={setIsFormCompleted} />

				<div className="flex justify-end border-t pt-4">
					<Button
						onClick={handleContinue}
						disabled={!isFormCompleted || isContinuing}
					>
						{isContinuing
							? "Updating..."
							: isLastStep
								? "Complete onboarding"
								: "Continue"}
					</Button>
				</div>
			</div>
		</div>
	);
}
