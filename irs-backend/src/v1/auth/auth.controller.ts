import type { Context } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";
import { getProfileById, roleRequestRepository } from "./auth.repository.js";

const createRoleRequestSchema = z.object({
	requestedRole: z.enum(["triage", "researcher"]),
});

export const authController = {
	async getProfile(c: Context) {
		const session = c.get("session");

		if (!session) {
			return c.json(
				{
					data: null,
					message: ReasonPhrases.UNAUTHORIZED,
				},
				StatusCodes.UNAUTHORIZED,
			);
		}

		const profile = await getProfileById(session.user.id);

		if (!profile) {
			return c.json(
				{
					data: null,
					message: ReasonPhrases.NOT_FOUND,
				},
				StatusCodes.NOT_FOUND,
			);
		}

		// Keep the profile response compatible with Better Auth's format.
		return c.json(profile, StatusCodes.OK);
	},

	async roleRequestRoutes(c: Context) {
		const session = c.get("session");

		if (!session) {
			return c.json(
				{
					data: null,
					message: ReasonPhrases.UNAUTHORIZED,
				},
				StatusCodes.UNAUTHORIZED,
			);
		}

		const body = await c.req.json().catch(() => null);
		const validation = createRoleRequestSchema.safeParse(body);

		if (!validation.success) {
			return c.json(
				{
					data: null,
					message: ReasonPhrases.BAD_REQUEST,
				},
				StatusCodes.BAD_REQUEST,
			);
		}

		const { requestedRole } = validation.data;

		const pendingRequest = await roleRequestRepository.findPendingByUserId(
			session.user.id,
		);

		if (pendingRequest) {
			return c.json(
				{
					data: pendingRequest,
					message: ReasonPhrases.CONFLICT,
				},
				StatusCodes.CONFLICT,
			);
		}

		const request = await roleRequestRepository.create(
			session.user.id,
			requestedRole,
		);

		return c.json(
			{
				message: ReasonPhrases.CREATED,
				data: request,
			},
			StatusCodes.CREATED,
		);
	},

	async getMyRoleRequests(c: Context) {
		const session = c.get("session");

		if (!session) {
			return c.json(
				{
					data: null,
					message: ReasonPhrases.UNAUTHORIZED,
				},
				StatusCodes.UNAUTHORIZED,
			);
		}

		const requests = await roleRequestRepository.findByUserId(session.user.id);

		if (requests.length === 0) {
			return c.json(
				{
					data: null,
					message: "No role requests found.",
				},
				StatusCodes.OK,
			);
		}

		return c.json(
			{
				data: requests,
				message: ReasonPhrases.OK,
			},
			StatusCodes.OK,
		);
	},

	async getAllRoleRequests(c: Context) {
		const session = c.get("session");

		if (!session) {
			return c.json(
				{
					data: null,
					message: ReasonPhrases.UNAUTHORIZED,
				},
				StatusCodes.UNAUTHORIZED,
			);
		}

		// TODO: Add admin-role authorization before exposing all users' requests.

		const requests = await roleRequestRepository.findAll();

		if (requests.length === 0) {
			return c.json(
				{
					data: null,
					message: "No role requests found.",
				},
				StatusCodes.OK,
			);
		}

		return c.json(
			{
				data: requests,
				message: ReasonPhrases.OK,
			},
			StatusCodes.OK,
		);
	},
};
