import type { Context } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { onboardingRepository } from "./onboarding.repository.js";

export const onboardingController = {
	async getSteps(c: Context) {
		const steps = await onboardingRepository.findSteps();

		return c.json({ data: steps, message: ReasonPhrases.OK }, StatusCodes.OK);
	},

	async getProgress(c: Context) {
		const session = c.get("session");

		if (!session) {
			return c.json(
				{ message: ReasonPhrases.UNAUTHORIZED },
				StatusCodes.UNAUTHORIZED,
			);
		}

		const currentProgress = await onboardingRepository.findProgress(
			session.user.id,
		);

		return c.json(
			{ data: currentProgress, message: ReasonPhrases.OK },
			StatusCodes.OK,
		);
	},

	async advanceStep(c: Context) {
		const session = c.get("session");

		if (!session) {
			return c.json(
				{ message: ReasonPhrases.UNAUTHORIZED },
				StatusCodes.UNAUTHORIZED,
			);
		}

		const currentProgress = await onboardingRepository.findProgress(
			session.user.id,
		);

		if (!currentProgress?.currentStep) {
			return c.json(
				{ data: null, message: ReasonPhrases.NOT_FOUND },
				StatusCodes.NOT_FOUND,
			);
		}

		// Already completed
		if (currentProgress.completedAt) {
			return c.json(
				{ data: currentProgress, message: ReasonPhrases.OK },
				StatusCodes.OK,
			);
		}

		const nextStep = await onboardingRepository.findNextStep(
			currentProgress.currentStep.stepOrder,
		);

		// No next step means the current step is the last one
		if (!nextStep) {
			const result = await onboardingRepository.markCompleted(session.user.id);

			return c.json(
				{ data: result, message: ReasonPhrases.OK },
				StatusCodes.OK,
			);
		}

		const result = await onboardingRepository.saveProgress(
			session.user.id,
			nextStep.id,
		);

		return c.json({ data: result, message: ReasonPhrases.OK }, StatusCodes.OK);
	},
};
