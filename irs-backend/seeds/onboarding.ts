import { and, desc, eq } from "drizzle-orm";
import { db } from "../src/db/index.js";
import { user } from "../src/db/schema/auth.js";
import { progress, steps } from "../src/db/schema/onboarding.js";

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

// Keep your existing onboardingSteps and seedOnboarding() here.

const completedUserEmails = [
	"admin@example.com",
	"triage@example.com",
	"researcher@example.com",
] as const;

export async function seedOnboardingProgress() {
	console.log("Seeding completed onboarding progress...");

	const [lastStep] = await db
		.select({ id: steps.id })
		.from(steps)
		.orderBy(desc(steps.stepOrder))
		.limit(1);

	if (!lastStep) {
		throw new Error("No onboarding steps found. Seed onboarding steps first.");
	}

	for (const email of completedUserEmails) {
		const [existingUser] = await db
			.select({ id: user.id })
			.from(user)
			.where(eq(user.email, email))
			.limit(1);

		if (!existingUser) {
			throw new Error(`User "${email}" not found.`);
		}

		await db
			.insert(progress)
			.values({
				userId: existingUser.id,
				currentStepId: lastStep.id,
				completedAt: new Date(),
			})
			.onConflictDoUpdate({
				target: progress.userId,
				set: {
					currentStepId: lastStep.id,
					completedAt: new Date(),
				},
			});

		console.log(`Marked onboarding as completed for ${email}`);
	}

	console.log("Onboarding progress seeded successfully!");
}
