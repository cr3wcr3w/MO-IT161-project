import { signupForm } from "../feature/signup/components/signup-form";
import { renderBrandMark } from "../shared/components/brand-mark";
import { renderLucideIcon } from "../shared/components/lucide-icon";
import { responsiveTypography } from "../shared/components/typography";
import { CheckCheck, ClipboardCheck, ShieldCheck, Users } from "lucide";

const html = String.raw;

export function renderSignUp(): string {
  return html`
    <main class="bg-slate-200 h-screen flex items-center justify-center px-2 text-black ">
      <section
        class="w-full max-w-7xl bg-slate-100 h-10/12 rounded-3xl shadow-x flex flex-col md:flex-row"
      >
        <div
          class="flex-1 p-4 md:p-10 bg-white/70 flex-col rounded-tl-3xl md:rounded-bl-3xl rounded-tr-3xl md:rounded-tr-non"
        >
          ${renderBrandMark()}

          <div class="w-full h-full flex justify-center items-center">
            <div class="max-w-md">
              <h1 class="${responsiveTypography.display} mb-3 font-bold text-slate-900">
                Create your account
              </h1>
              <h2 class="${responsiveTypography.body} text-slate-500">
                Sign up to manage secure incident reports
              </h2>

              ${signupForm()}

              <p class="${responsiveTypography.bodySmall} text-slate-700">
                Already have an account?
                <a href="/signin" class="text-sky-600 hover:underline">Sign in</a>
              </p>
            </div>
          </div>
        </div>

        <div
          class="md:rounded-tr-3xl overflow-hidden rounded-br-3xl rounded-bl-3xl md:rounded-bl-none flex-1 flex p-4 relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 text-white"
        >
          <div
            class="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full border border-white/10 bg-white/5"
            aria-hidden="true"
          ></div>

          <div
            class="pointer-events-none absolute -right-16 top-20 h-72 w-72 rounded-full border border-white/10 bg-white/5"
            aria-hidden="true"
          ></div>

          <div class="absolute *:inset-0 flex items-center justify-center h-full">
            <div class="relative z-10 mx-auto max-w-xl">
              <div
                class="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-inner"
                aria-hidden="true"
              >
                ${renderLucideIcon(ShieldCheck, { size: 38, strokeWidth: 2, color: "white", className: "text-white" }).outerHTML}
              </div>

              <h2 class="${responsiveTypography.heroTitle} text-center font-bold text-white">
                Secure. Transparent. Accountable.
              </h2>
              <p class="${responsiveTypography.body} mt-5 text-slate-300">
                The Incident Report System allows researchers to submit reports and triagers to
                review, validate, and track incidents efficiently.
              </p>

              <div class="mt-8 space-y-5 sm:space-y-6">
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                  >
                    ${renderLucideIcon(Users, { size: 20, strokeWidth: 2, color: "white", className: "text-white" }).outerHTML}
                  </div>
                  <div class="min-w-0">
                    <h3 class="${responsiveTypography.heading} text-white">Submit</h3>
                    <p class="${responsiveTypography.bodySmall} text-slate-300">
                      Report security issues quickly and easily.
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                  >
                    ${renderLucideIcon(ClipboardCheck, { size: 20, strokeWidth: 2, color: "white", className: "text-white" }).outerHTML}
                  </div>
                  <div class="min-w-0">
                    <h3 class="${responsiveTypography.heading} text-white">Review</h3>
                    <p class="${responsiveTypography.bodySmall} text-slate-300">
                      Triagers review and validate reports.
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                  >
                    ${renderLucideIcon(CheckCheck, { size: 20, strokeWidth: 2, color: "white", className: "text-white" }).outerHTML}
                  </div>
                  <div class="min-w-0">
                    <h3 class="${responsiveTypography.heading} text-white">Track</h3>
                    <p class="${responsiveTypography.bodySmall} text-slate-300">
                      Track the status and resolution of reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}
