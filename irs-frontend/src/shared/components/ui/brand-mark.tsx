import { cn } from "cn";
import { ShieldCheck } from "lucide-react";

type BrandMarkProps = {
	showText?: boolean;
	text?: string;
	textColor?: "white" | "black";
	size?: number;
	wrapperClassName?: string;
	textClassName?: string;
	iconClassName?: string;
};

export function BrandMark({
	showText = true,
	text = "Incident Report System",
	textColor = "black",
	size = 18,
	wrapperClassName = "flex items-center gap-3 text-slate-900",
	textClassName = "text-sm font-semibold sm:text-base",
	iconClassName = "text-white",
}: BrandMarkProps) {
	const textColorClassName =
		textColor === "white" ? "text-white" : "text-black";

	if (!showText) {
		return (
			<span
				className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 shadow-inner ring-1 ring-white/20"
				aria-hidden="true"
			>
				<ShieldCheck
					size={size}
					strokeWidth={2}
					className={cn("text-white", iconClassName)}
				/>
			</span>
		);
	}

	return (
		<div className={wrapperClassName}>
			<span
				className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 shadow-inner ring-1 ring-white/20"
				aria-hidden="true"
			>
				<ShieldCheck
					size={size}
					strokeWidth={2}
					className={cn("text-white", iconClassName)}
				/>
			</span>

			<span className={cn(textClassName, textColorClassName)}>{text}</span>
		</div>
	);
}
