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

const signinSchema = z.object({
	email: z.email().trim().min(1, "Email is required."),
	password: z.string().min(1, "Password is required."),
});

type SignInFormValues = z.infer<typeof signinSchema>;

export function SignInForm({
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
	} = useForm<SignInFormValues>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const signinHandler = async (values: SignInFormValues) => {
		setErrorMessage("");
		clearErrors("root");

		try {
			const result = await authClient.signIn.email({
				email: values.email,
				password: values.password,
				callbackURL: "/dashboard",
			});

			if (result.error) {
				setError("root", {
					message:
						result.error.message || "Unable to sign in. Please try again.",
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
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Access your incident reports and manage your account
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(signinHandler)} noValidate>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="joe@example.com"
									autoComplete="email"
									aria-invalid={!!errors.email}
									{...register("email")}
								/>
								{errors.email && (
									<FieldDescription>{errors.email.message}</FieldDescription>
								)}
							</Field>

							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<Link
										to="/"
										className="ml-auto inline-block text-sm hover:underline"
									>
										Forgot your password?
									</Link>
								</div>

								<div className="relative">
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										autoComplete="current-password"
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
									<FieldDescription>{errors.password.message}</FieldDescription>
								)}
							</Field>

							<Field>
								{(errors.root?.message || errorMessage) && (
									<FieldDescription>
										{errors.root?.message || errorMessage}
									</FieldDescription>
								)}

								<Button
									type="submit"
									disabled={isSubmitting}
									className="hover:cursor-pointer"
								>
									{isSubmitting ? "Signing in..." : "Login"}
								</Button>

								<FieldDescription className="text-center">
									Don&apos;t have an account?{" "}
									<Link
										to="/signup"
										className="ml-auto inline-block text-sm hover:underline hover:text-black"
									>
										Sign up
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
