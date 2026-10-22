interface OnBoardingEmailOptionsType {
	otp: string;
	expiresInMinutes?: number;
}

export function generateOnBoardingEmail({
	otp,
	expiresInMinutes = 5,
}: OnBoardingEmailOptionsType) {
	return {
		subject: "Complete Your Onboarding | IRS",
		text: [
			"Welcome to the Incident Reporting System (IRS)!",
			"",
			"You're one step closer to completing your account setup.",
			"Use the verification code below to confirm your email address and continue onboarding:",
			"",
			`Verification Code: ${otp}`,
			"",
			`This code expires in ${expiresInMinutes} minutes.`,
			"",
			"If you did not initiate this request, you can safely ignore this email.",
			"",
			"Thank you,",
			"Incident Reporting System (IRS)",
			"Automated message. Please do not reply.",
		].join("\n"),
		html: `
			<div style="font-family: Arial, sans-serif; max-width: 560px; margin: 24px auto; padding: 32px 24px; color: #18181b; line-height: 1.6; border: 1px solid #e4e4e7; border-radius: 12px;">
				<h2 style="margin: 0 0 8px;">Welcome to IRS</h2>

				<p style="margin: 0 0 24px; color: #71717a; font-size: 14px;">
					Incident Reporting System
				</p>

				<p>Hello,</p>

				<p>
					You're one step closer to completing your account setup.
					To continue onboarding, confirm your email address using the
					verification code below.
				</p>

				<div style="padding: 24px; margin: 28px 0; background: #f4f4f5; border-radius: 8px; text-align: center;">
					<p style="margin: 0 0 8px; color: #71717a; font-size: 13px;">
						YOUR VERIFICATION CODE
					</p>

					<strong style="font-size: 32px; letter-spacing: 8px;">
						${otp}
					</strong>

					<p style="margin: 12px 0 0; color: #71717a; font-size: 13px;">
						Expires in ${expiresInMinutes} minutes
					</p>
				</div>

				<p>
					Enter this code in the IRS onboarding page to continue setting
					up your account.
				</p>

				<p style="font-size: 14px; color: #52525b;">
					If you did not initiate this request, you can safely ignore
					this email.
				</p>

				<hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 28px 0 16px;" />

				<p style="font-size: 12px; color: #71717a; margin-bottom: 0;">
					Incident Reporting System (IRS)<br />
					Automated message. Please do not reply.
				</p>
			</div>
		`,
	};
}
