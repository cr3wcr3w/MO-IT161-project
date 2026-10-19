import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { cn } from "cn";
import {
	CheckCheck,
	ClipboardCheck,
	Eye,
	EyeOff,
	ShieldCheck,
	Users,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BrandMark } from "#/shared/components/ui/brand-mark";
import { Button } from "@/shared/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { authClient } from "@/shared/lib/auth-client";

const signupSchema = z.object({
	email: z
		.email("Enter a valid email address.")
		.trim()
		.min(1, "Email is required."),
	password: z.string().min(8, "Password must be at least 8 characters."),
});

type SignUpFormValues = z.infer<typeof signupSchema>;

const features = [
	{
		title: "Submit",
		description: "Report security issues quickly and easily.",
		icon: Users,
	},
	{
		title: "Review",
		description: "Triagers review and validate reports.",
		icon: ClipboardCheck,
	},
	{
		title: "Track",
		description: "Track the status and resolution of reports.",
		icon: CheckCheck,
	},
];

export function SignUpForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [errorMessage, setErrorMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const signupHandler = async (values: SignUpFormValues) => {
		setErrorMessage("");
		clearErrors("root");

		try {
			const result = await authClient.signUp.email({
				email: values.email,
				password: values.password,
				name: "",
				callbackURL: "/dashboard",
			});

			if (result.error) {
				setError("root", {
					message: result.error.message || "Unable to create your account.",
				});
				return;
			}

			await navigate({
				to: "/dashboard",
				replace: true,
			});
		} catch {
			setErrorMessage("Something went wrong. Please try again.");
		}
	};

	return (
		<div
			className={cn("h-full min-h-0 w-full overflow-hidden", className)}
			{...props}
		>
			<div className="grid h-full min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-[#fbfbfd] shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
				{/* Left panel: Signup form */}
				<section className="flex min-h-0 min-w-0 flex-col bg-[#fbfbfd] px-5 py-4 sm:px-8 sm:py-5 lg:px-10">
					{/* Brand */}
					<div className="flex shrink-0 items-center">
						<BrandMark />
					</div>

					{/* Vertically centered form */}
					<div className="flex min-h-0 flex-1 items-center justify-center py-2">
						<div className="w-full max-w-[380px]">
							<div className="mb-5 space-y-2">
								<h1 className="text-3xl font-bold leading-tight tracking-tight text-[#111b30] sm:text-4xl">
									Create an
									<br />
									account
								</h1>

								<p className="max-w-97.5 text-sm leading-6 text-slate-500 sm:text-base">
									Register to access the Incident Report System.
								</p>
							</div>

							<form
								onSubmit={handleSubmit(signupHandler)}
								noValidate
								className="space-y-2"
							>
								<FieldGroup className="gap-3">
									{/* Email */}
									<Field className="gap-1.5">
										<FieldLabel
											htmlFor="signup-email"
											className="text-sm font-medium text-[#111b30]"
										>
											Email
										</FieldLabel>

										<Input
											id="signup-email"
											type="email"
											placeholder="Enter your email"
											autoComplete="email"
											aria-invalid={!!errors.email}
											className="h-11 rounded-xl border-slate-200 bg-white px-3 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-300"
											{...register("email")}
										/>

										{errors.email && (
											<FieldDescription className="text-red-600">
												{errors.email.message}
											</FieldDescription>
										)}
									</Field>

									{/* Password */}
									<Field className="gap-1.5">
										<FieldLabel
											htmlFor="signup-password"
											className="text-sm font-medium text-[#111b30]"
										>
											Password
										</FieldLabel>

										<div className="relative">
											<Input
												id="signup-password"
												type={showPassword ? "text" : "password"}
												autoComplete="new-password"
												placeholder="At least 8 characters"
												aria-invalid={!!errors.password}
												className="h-11 rounded-xl border-slate-200 bg-white px-3 pr-11 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-300"
												{...register("password")}
											/>

											<button
												type="button"
												onClick={() => setShowPassword((previous) => !previous)}
												className="hover:cursor-pointer absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 transition-colors hover:text-slate-700"
												aria-label={
													showPassword ? "Hide password" : "Show password"
												}
												aria-pressed={showPassword}
											>
												{showPassword ? (
													<EyeOff className="size-4" />
												) : (
													<Eye className="size-4" />
												)}
											</button>
										</div>

										{errors.password && (
											<FieldDescription className="text-red-600">
												{errors.password.message}
											</FieldDescription>
										)}
									</Field>
								</FieldGroup>

								{/* Authentication errors */}
								{(errors.root?.message || errorMessage) && (
									<p role="alert" className="text-sm text-red-600">
										{errors.root?.message || errorMessage}
									</p>
								)}

								{/* Submit */}
								<Button
									type="submit"
									disabled={isSubmitting}
									className="hover:cursor-pointer h-11 w-full rounded-xl bg-[#030719] text-base font-semibold text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-[#17233b] disabled:cursor-not-allowed"
								>
									{isSubmitting ? "Creating account..." : "Create account"}
								</Button>

								<p className="pt-1 text-sm text-slate-600 sm:text-base">
									Already have an account?{" "}
									<Link
										to="/signin"
										className="font-medium text-sky-600 hover:text-sky-700 hover:underline"
									>
										Sign in
									</Link>
								</p>
							</form>
						</div>
					</div>
				</section>

				{/* Right panel: Shared signin design */}
				<section className="relative hidden h-full min-h-0 min-w-0 flex-col justify-center overflow-hidden bg-linear-to-br from-[#18243a] via-[#101a2e] to-[#050c1d] px-6 py-5 text-white lg:flex lg:px-8 xl:px-10">
					{/* Decorative circles */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -right-16 top-[9%] size-67.5 rounded-full border border-white/8 bg-white/[0.035]"
					/>

					<div
						aria-hidden="true"
						className="pointer-events-none absolute -bottom-24 -left-20 size-70 rounded-full border border-white/8 bg-white/[0.035]"
					/>

					<div
						aria-hidden="true"
						className="pointer-events-none absolute bottom-[15%] right-[15%] size-32 rounded-full bg-blue-400/2.5 blur-3xl"
					/>

					<div className="relative z-10 mx-auto w-full max-w-140">
						{/* Shield icon */}
						<div className="mb-5 flex justify-center">
							<div className="flex size-16 items-center justify-center rounded-full border border-white/8 bg-white/8 shadow-inner">
								<ShieldCheck className="size-7 text-white" strokeWidth={2} />
							</div>
						</div>

						{/* Signup introduction */}
						<div className="mb-6 text-center">
							<h2 className="text-2xl font-bold leading-tight tracking-tight xl:text-3xl">
								Join. Report. Make an Impact.
							</h2>

							<p className="mt-4 text-sm leading-6 text-slate-300 xl:text-base xl:leading-7">
								Create your account to report security issues, collaborate with
								triagers, and track incidents from submission to resolution.
							</p>
						</div>

						{/* Shared features */}
						<div className="space-y-4">
							{features.map((feature) => {
								const Icon = feature.icon;

								return (
									<div key={feature.title} className="flex items-center gap-4">
										<div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/6">
											<Icon
												className="size-5 text-slate-200"
												strokeWidth={1.8}
											/>
										</div>

										<div className="min-w-0">
											<h3 className="text-base font-semibold leading-6 xl:text-lg">
												{feature.title}
											</h3>

											<p className="mt-1 text-sm leading-5 text-slate-300 xl:text-base xl:leading-6">
												{feature.description}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
