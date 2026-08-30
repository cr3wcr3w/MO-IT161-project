import { createElement } from "lucide";

type IconNode = [tag: string, attrs: Record<string, string | number | undefined>][];
type LucideIcon = IconNode;

export type LucideIconOptions = {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  title?: string;
  ariaLabel?: string;
};

export function renderLucideIcon(icon: LucideIcon, options: LucideIconOptions = {}): SVGElement {
  const {
    size = 20,
    strokeWidth = 2,
    color = "currentColor",
    className = "",
    title,
    ariaLabel,
  } = options;

  const svg = createElement(icon, {
    size,
    strokeWidth,
    color,
    class: className,
    title,
    "aria-label": ariaLabel,
    role: ariaLabel ? "img" : undefined,
  });

  return svg as SVGElement;
}

export function bindLucideIcons(root: ParentNode = document): void {
  const nodes = root.querySelectorAll<HTMLElement>("[data-lucide]");

  nodes.forEach((node) => {
    const iconName = node.dataset.lucide;
    if (!iconName) {
      return;
    }

    const iconMap = (
      globalThis as typeof globalThis & {
        __lucideIcons?: Record<string, LucideIcon>;
      }
    ).__lucideIcons;

    if (!iconMap || !iconMap[iconName]) {
      return;
    }

    const svg = renderLucideIcon(iconMap[iconName], {
      size: Number(node.dataset.size ?? 20),
      strokeWidth: Number(node.dataset.strokeWidth ?? 2),
      color: node.dataset.color ?? "currentColor",
      className: node.className,
      ariaLabel: node.getAttribute("aria-label") ?? undefined,
    });

    node.replaceWith(svg);
  });
}

export function registerLucideIcons(iconMap: Record<string, LucideIcon>): void {
  (globalThis as typeof globalThis & { __lucideIcons?: Record<string, LucideIcon> }).__lucideIcons =
    iconMap;
}
