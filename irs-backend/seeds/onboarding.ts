import { and, eq } from "drizzle-orm";
import { db } from "../src/db/index.js";
import { steps } from "../src/db/schema/onboarding.js";

const onboardingSteps = [
	{
		title: "Verify Email",
		description: "Verify your registered email address.",
		stepOrder: 1,
	},
	{
		title: "Request Role",
		description: "Request access to the role that suits your responsibilities.",
		stepOrder: 2,
	},
] as const;

export async function seedOnboarding() {
	try {
		for (const step of onboardingSteps) {
			const [existingStep] = await db
				.select({ id: steps.id })
				.from(steps)
				.where(
					and(
						eq(steps.title, step.title),
						eq(steps.description, step.description),
					),
				)
				.limit(1);

			if (!existingStep) {
				await db.insert(steps).values({
					...step,
				});
			}
		}

		console.log("Onboarding steps seeded successfully.");
	} catch (error) {
		console.error("Failed to seed onboarding steps:", error);
		throw error;
	}
}
