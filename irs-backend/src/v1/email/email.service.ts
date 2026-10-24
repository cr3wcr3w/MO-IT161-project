import nodemailer from "nodemailer";
import { env } from "../../config/env.js";

const smtpConfigured = Boolean(
	env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS,
);

const transporter = smtpConfigured
	? nodemailer.createTransport({
			host: env.SMTP_HOST,
			port: env.SMTP_PORT,
			secure: env.SMTP_PORT === 465,
			auth: {
				user: env.SMTP_USER,
				pass: env.SMTP_PASS,
			},
		})
	: null;

export interface SendEmailOptions {
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

export async function sendEmail(options: SendEmailOptions) {
	if (!transporter) {
		throw new Error("Email service is not configured");
	}

	return transporter.sendMail({
		from: env.SMTP_USER,
		...options,
	});
}

export function isEmailConfigured() {
	return transporter !== null;
}
