import { CheckCircle2, Mail, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { Label } from "@/shared/components/ui/label";
import { authClient, useSession } from "@/shared/lib/auth-client";

import type { OnboardingStepComponentProps } from "./onboarding-stepper";

export function VerifyEmail({
	onFormCompletedChange,
}: OnboardingStepComponentProps) {
	const { data: session, isPending: isSessionPending } = useSession();

	const [otp, setOtp] = useState("");
	const [isSending, setIsSending] = useState(false);
	const [isVerifying, setIsVerifying] = useState(false);
	const [otpSent, setOtpSent] = useState(false);
	const [isVerified, setIsVerified] = useState(false);

	const email = session?.user.email ?? "";

	useEffect(() => {
		if (isSessionPending) return;

		const verified = Boolean(session?.user.emailVerified);

		setIsVerified(verified);
		onFormCompletedChange(verified);
	}, [isSessionPending, session?.user.emailVerified, onFormCompletedChange]);

	async function handleSendOTP() {
		if (!email || isSending) return;

		setIsSending(true);

		try {
			const { error } = await authClient.emailOtp.sendVerificationOtp({
				email,
				type: "email-verification",
			});

			if (error) {
				toast.error(error.message || "Failed to send verification code.");
				return;
			}

			setOtp("");
			setOtpSent(true);
			toast.success("Verification code sent to your email.");
		} catch {
			toast.error("Something went wrong while sending the code.");
		} finally {
			setIsSending(false);
		}
	}

	async function handleVerifyOTP() {
		if (!email || otp.length !== 6 || isVerifying) return;

		setIsVerifying(true);

		try {
			const { error } = await authClient.emailOtp.verifyEmail({
				email,
				otp,
			});

			if (error) {
				toast.error(error.message || "Invalid or expired verification code.");
				return;
			}

			// Refresh the session after verifying the email.
			const { data: refreshedSession } = await authClient.getSession();

			if (!refreshedSession?.user.emailVerified) {
				toast.error(
					"Email verification could not be confirmed. Please try again.",
				);
				return;
			}

			setIsVerified(true);
			onFormCompletedChange(true);
			toast.success("Email verified successfully!");
		} catch {
			toast.error("Something went wrong while verifying your email.");
		} finally {
			setIsVerifying(false);
		}
	}

	if (isSessionPending) {
		return (
			<p className="text-sm text-muted-foreground">Loading your account...</p>
		);
	}

	if (!email) {
		return (
			<p className="text-sm text-destructive">
				Unable to retrieve your account email. Please sign in again.
			</p>
		);
	}

	if (isVerified) {
		return (
			<div className="flex items-start gap-3 rounded-lg border p-4">
				<CheckCircle2 className="mt-0.5 size-5 text-green-600" />
				<div className="space-y-1">
					<h2 className="font-semibold">Email verified</h2>
					<p className="text-sm text-muted-foreground">{email}</p>
					<p className="text-sm text-muted-foreground">
						Your email address has been successfully verified.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-md space-y-6">
			<div className="flex items-start gap-3">
				<div className="rounded-lg bg-muted p-3">
					<Mail className="size-5" />
				</div>
				<div className="space-y-1">
					<h2 className="text-xl font-semibold">Verify your email</h2>
					<p className="text-sm text-muted-foreground">
						We'll send a one-time verification code to your registered email.
					</p>
				</div>
			</div>

			<div className="space-y-2">
				<Label>Email address</Label>
				<div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
					{email}
				</div>
			</div>

			{!otpSent ? (
				<Button onClick={handleSendOTP} disabled={isSending}>
					{isSending ? "Sending code..." : "Send verification code"}
				</Button>
			) : (
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="verification-otp">Verification code</Label>
						<InputOTP
							id="verification-otp"
							maxLength={6}
							value={otp}
							onChange={setOtp}
							disabled={isVerifying}
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
					</div>

					<Button
						className="w-full"
						onClick={handleVerifyOTP}
						disabled={otp.length !== 6 || isVerifying}
					>
						{isVerifying ? "Verifying..." : "Verify email"}
					</Button>

					<Button
						variant="outline"
						className="w-full"
						onClick={handleSendOTP}
						disabled={isSending || isVerifying}
					>
						<RefreshCw className="mr-2 size-4" />
						{isSending ? "Sending..." : "Resend verification code"}
					</Button>
				</div>
			)}
		</div>
	);
}
