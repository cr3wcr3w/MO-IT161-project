import { renderBrandMark } from "./brand-mark";
import { renderTypography, responsiveTypography } from "./typography";

const html = String.raw;

// remove aria label

export function renderDashboardNav({ authenticated }: { authenticated: boolean }): string {
  if (authenticated === false) {
    return html`
      <nav
        class="border-b border-white/10 bg-linear-to-r from-slate-950 via-slate-900 to-slate-800 text-white shadow-lg shadow-slate-950/10"
      >
        <div
          class="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
        >
          ${renderBrandMark({
            textColor: "white",
            wrapperClassName: "flex min-w-0 items-center gap-3 text-white",
            textClassName: responsiveTypography.brand,
          })}

          <div class="flex items-center">
            <a
              href="/signin"
              class="btn btn-sm border-0 bg-white px-4 text-slate-950 shadow-md shadow-slate-950/30 hover:bg-slate-200 sm:btn-md"
            >
              ${renderTypography({
                as: "span",
                variant: "button",
                className: "text-sm sm:text-base",
                content: "Sign in",
              })}
            </a>
          </div>
        </div>
      </nav>
    `;
  }

  return html`
    <nav class="">
      <a href="/">authenticated</a>
    </nav>
  `;
}
