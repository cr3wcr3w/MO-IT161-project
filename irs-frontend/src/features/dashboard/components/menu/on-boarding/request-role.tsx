import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import type { OnboardingStepComponentProps } from "./onboarding-stepper";

export function RequestRole({
	onFormCompletedChange,
}: OnboardingStepComponentProps) {
	const [isFormCompleted, setIsFormCompleted] = useState(false);

	function handleDoneForm() {
		setIsFormCompleted(true);
		onFormCompletedChange(true);
	}

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">Request a role</h2>

			<Button onClick={handleDoneForm} disabled={isFormCompleted}>
				{isFormCompleted ? "Form Completed" : "Done form"}
			</Button>
		</div>
	);
}
