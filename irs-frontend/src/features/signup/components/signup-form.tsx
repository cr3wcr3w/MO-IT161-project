import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { cn } from "cn";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BrandMark } from "#/shared/components/ui/brand-mark";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
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

export function SignUpForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [errorMessage, setErrorMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);

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

	console.log("here");

	const signupHandler = async (values: SignUpFormValues) => {
		setErrorMessage("");
		clearErrors("root");
		console.log("hi");

		try {
			const result = await authClient.signUp.email({
				email: values.email,
				password: values.password,
				name: "",
				callbackURL: "/dashboard",
			});

			console.log(result);

			if (result.error) {
				setError("root", {
					message: result.error.message || "Unable to create your account.",
				});
				return;
			}
		} catch {
			setErrorMessage("Something went wrong. Please try again.");
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<div className="pb-2">
						<BrandMark />
					</div>

					<CardTitle>Create an account</CardTitle>
					<CardDescription>
						Register to access the Incident Report System.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(signupHandler)} noValidate>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="signup-email">Email</FieldLabel>
								<Input
									id="signup-email"
									type="email"
									placeholder="joe@example.com"
									autoComplete="email"
									aria-invalid={!!errors.email}
									{...register("email")}
								/>
								{errors.email && (
									<FieldDescription className="text-destructive">
										{errors.email.message}
									</FieldDescription>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor="signup-password">Password</FieldLabel>

								<div className="relative">
									<Input
										id="signup-password"
										type={showPassword ? "text" : "password"}
										autoComplete="new-password"
										placeholder="At least 8 characters"
										aria-invalid={!!errors.password}
										className="pr-10"
										{...register("password")}
									/>

									<button
										type="button"
										onClick={() => setShowPassword((previous) => !previous)}
										className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
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
									<FieldDescription className="text-destructive">
										{errors.password.message}
									</FieldDescription>
								)}
							</Field>

							<Field>
								{(errors.root?.message || errorMessage) && (
									<FieldDescription className="text-destructive" role="alert">
										{errors.root?.message || errorMessage}
									</FieldDescription>
								)}

								<Button
									type="submit"
									disabled={isSubmitting}
									className="w-full hover:cursor-pointer"
								>
									{isSubmitting ? "Creating account..." : "Create account"}
								</Button>

								<FieldDescription className="text-center">
									Already have an account?{" "}
									<Link
										to="/signin"
										className="font-medium hover:text-foreground hover:underline"
									>
										Sign in
									</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
