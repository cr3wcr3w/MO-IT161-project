const html = String.raw;

export const responsiveTypography = {
  // Largest headline for primary page titles and hero sections.
  display: "text-[clamp(2rem,2vw+1vh,4rem)] leading-[1.1] tracking-tight",
  // Secondary hero heading for banner-style statements on split layouts.
  heroTitle: "text-[clamp(1.8rem,1.5vw+1vh,3.5rem)] leading-[1.15] tracking-tight",
  // Section headings and card titles that need emphasis but not full-page scale.
  heading: "text-[clamp(1.15rem,0.9vw+0.5vh,1.8rem)] leading-[1.35] font-semibold",
  // Main reading text for paragraphs and general content blocks.
  body: "text-[clamp(0.95rem,0.8vw+0.6vh,1.75rem)] leading-[1.5]",
  // Smaller supporting paragraph text used under headings or in content lists.
  bodySmall: "text-[clamp(0.9rem,0.7vw+0.45vh,1.3rem)] leading-[1.5]",
  // Form field labels and inline labels that should remain readable and compact.
  label: "text-[clamp(0.8rem,0.5vw+0.35vh,1rem)] leading-[1.4] font-medium",
  // Button labels that should feel prominent but remain compact on mobile.
  button: "text-[clamp(1rem,0.7vw+0.5vh,1.35rem)] leading-[1.4] font-bold",
  // Brand names and app identity text used in nav/headers.
  brand: "text-[clamp(1rem,0.8vw+0.4vh,1.7rem)] leading-[1.2] font-bold tracking-tight",
  // Tiny metadata text such as captions, timestamps, or helper labels.
  meta: "text-[clamp(0.7rem,0.45vw+0.35vh,0.9rem)] leading-[1.4]",
};

type TypographyTag = keyof HTMLElementTagNameMap;

type RenderTypographyOptions = {
  as?: TypographyTag;
  variant?: keyof typeof responsiveTypography;
  className?: string;
  content?: string;
};

export function renderTypography({
  as = "p",
  variant = "body",
  className = "",
  content = "",
}: RenderTypographyOptions = {}): string {
  const classes = [responsiveTypography[variant], className].filter(Boolean).join(" ");

  return html`<${as} class="${classes}">${content}</${as}>`;
}
