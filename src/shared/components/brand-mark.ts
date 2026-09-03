import { ShieldCheck } from "lucide";
import { renderLucideIcon } from "./lucide-icon";
import { responsiveTypography } from "./typography";

const html = String.raw;

type BrandMarkOptions = {
  showText?: boolean;
  text?: string;
  textColor?: "white" | "black";
  size?: number;
  wrapperClassName?: string;
  textClassName?: string;
  iconClassName?: string;
};

export function renderBrandMark({
  showText = true,
  text = "Incident Report System",
  textColor = "black",
  size = 18,
  wrapperClassName = "flex items-center gap-3 text-slate-900",
  textClassName = responsiveTypography.brand,
  iconClassName = "text-white",
}: BrandMarkOptions = {}): string {
  const icon = renderLucideIcon(ShieldCheck, {
    size,
    strokeWidth: 2,
    color: "white",
    className: iconClassName,
  }).outerHTML;
  const textColorClassName = textColor === "white" ? "text-white" : "text-black";

  if (!showText) {
    return html`
      <span
        class="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 shadow-inner ring-1 ring-white/20"
        aria-hidden="true"
      >
        ${icon}
      </span>
    `;
  }

  return html`
    <div class="${wrapperClassName}" aria-label="${text} brand">
      <span
        class="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 shadow-inner ring-1 ring-white/20"
        aria-hidden="true"
      >
        ${icon}
      </span>
      <span class="${textClassName} ${textColorClassName}">${text}</span>
    </div>
  `;
}
