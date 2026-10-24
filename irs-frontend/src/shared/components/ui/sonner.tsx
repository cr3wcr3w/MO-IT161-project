import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			icons={{
				success: <CircleCheckIcon className="size-5" />,
				info: <InfoIcon className="size-5" />,
				warning: <TriangleAlertIcon className="size-5" />,
				error: <OctagonXIcon className="size-5" />,
				loading: <Loader2Icon className="size-5 animate-spin" />,
			}}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "var(--radius)",
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast: "cn-toast border shadow-lg",
					success:
						"cn-toast-success !border-emerald-500/30 !bg-emerald-500/10 !text-emerald-700 dark:!text-emerald-400",
					error:
						"cn-toast-error !border-red-500/30 !bg-red-500/10 !text-red-700 dark:!text-red-400",
					warning:
						"cn-toast-warning !border-amber-500/30 !bg-amber-500/10 !text-amber-700 dark:!text-amber-400",
					info: "cn-toast-info !border-blue-500/30 !bg-blue-500/10 !text-blue-700 dark:!text-blue-400",
					loading: "cn-toast-loading",
					title: "font-semibold",
					description: "!text-muted-foreground",
					closeButton:
						"!border-border !bg-background !text-foreground hover:!bg-muted",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
