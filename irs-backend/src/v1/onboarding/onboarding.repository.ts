import { asc, eq, gt } from "drizzle-orm";
import { db } from "../../db/index.js";
import { progress, steps } from "../../db/schema/onboarding.js";

export const onboardingRepository = {
	async findSteps() {
		return db.select().from(steps).orderBy(asc(steps.stepOrder));
	},

	async findProgress(userId: string) {
		const [result] = await db
			.select({
				userId: progress.userId,
				currentStep: steps,
			})
			.from(progress)
			.leftJoin(steps, eq(progress.currentStepId, steps.id))
			.where(eq(progress.userId, userId))
			.limit(1);

		return result ?? null;
	},

	async findFirstStep() {
		const [step] = await db
			.select()
			.from(steps)
			.orderBy(asc(steps.stepOrder))
			.limit(1);

		return step ?? null;
	},

	async findNextStep(currentStepOrder: number) {
		const [step] = await db
			.select()
			.from(steps)
			.where(gt(steps.stepOrder, currentStepOrder))
			.orderBy(asc(steps.stepOrder))
			.limit(1);

		return step ?? null;
	},

	async findStepById(stepId: number) {
		const [step] = await db
			.select()
			.from(steps)
			.where(eq(steps.id, stepId))
			.limit(1);

		return step ?? null;
	},

	async saveProgress(userId: string, stepId: number) {
		const [result] = await db
			.insert(progress)
			.values({
				userId,
				currentStepId: stepId,
			})
			.onConflictDoUpdate({
				target: progress.userId,
				set: {
					currentStepId: stepId,
				},
			})
			.returning();

		return result;
	},
};
