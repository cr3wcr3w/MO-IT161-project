import { CheckCheck, ClipboardCheck, ShieldCheck, Users } from "lucide";
import { renderBrandMark } from "../shared/components/brand-mark";
import { renderLucideIcon } from "../shared/components/lucide-icon";

const html = String.raw;

export function renderSignIn(): string {
  return html`
    <main class="min-h-screen overflow-hidden bg-slate-100 p-3 sm:p-5 lg:p-8">
      <div
        class="mx-auto grid h-full w-full max-w-7xl overflow-hidden rounded-3xl bg-slate-50 shadow-xl lg:grid-cols-2"
      >
        <section class="bg-white/70 px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-9">
          <div class="mb-8 lg:mb-14">${renderBrandMark()}</div>

          <div class="mx-auto flex max-w-md flex-col justify-center lg:min-h-[70vh]">
            <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Welcome back
            </h1>
            <p class="mt-3 text-base text-slate-500 sm:text-lg lg:text-2xl lg:leading-relaxed">
              Sign in to continue to your account
            </p>

            <form class="mt-7 space-y-5" autocomplete="off">
              <label class="form-control w-full">
                <span class="mb-2 text-sm font-medium text-slate-700">Email address</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
                  autocomplete="off"
                />
              </label>

              <label class="form-control w-full">
                <span class="mb-2 text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
                  autocomplete="off"
                />
              </label>

              <a href="#" class="inline-block text-sm font-medium text-sky-700 hover:text-sky-800"
                >Forgot password?</a
              >

              <button
                type="button"
                class="btn h-14 w-full rounded-2xl border-0 bg-slate-950 text-lg font-bold text-white shadow-xl hover:bg-slate-900"
              >
                Sign in
              </button>
            </form>

            <div
              class="mt-8 flex flex-wrap items-center justify-center gap-2 text-base text-slate-700"
            >
              <span>Don’t have an account?</span>
              <a href="/signup" class="text-sm font-semibold text-sky-700 hover:text-sky-800"
                >Sign up</a
              >
            </div>
          </div>
        </section>

        <aside
          class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-5 py-8 text-white sm:px-8 lg:px-12 lg:py-10"
          aria-label="Security features"
        >
          <div
            class="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full border border-white/10 bg-white/5"
            aria-hidden="true"
          ></div>
          <div
            class="pointer-events-none absolute -right-16 top-20 h-72 w-72 rounded-full border border-white/10 bg-white/5"
            aria-hidden="true"
          ></div>

          <div class="relative z-10 mx-auto max-w-xl">
            <div
              class="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-inner"
              aria-hidden="true"
            >
              ${renderLucideIcon(ShieldCheck, { size: 38, strokeWidth: 2, color: "white", className: "text-white" }).outerHTML}
            </div>

            <h2
              class="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Secure. Transparent. Accountable.
            </h2>
            <p class="mt-5 text-base text-slate-300 sm:text-lg lg:text-2xl lg:leading-relaxed">
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
                  <h3 class="text-xl font-semibold text-white">Submit</h3>
                  <p class="text-base text-slate-300">Report security issues quickly and easily.</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                >
                  ${renderLucideIcon(ClipboardCheck, { size: 20, strokeWidth: 2, color: "white", className: "text-white" }).outerHTML}
                </div>
                <div class="min-w-0">
                  <h3 class="text-xl font-semibold text-white">Review</h3>
                  <p class="text-base text-slate-300">Triagers review and validate reports.</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                >
                  ${renderLucideIcon(CheckCheck, { size: 20, strokeWidth: 2, color: "white", className: "text-white" }).outerHTML}
                </div>
                <div class="min-w-0">
                  <h3 class="text-xl font-semibold text-white">Track</h3>
                  <p class="text-base text-slate-300">
                    Track the status and resolution of reports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  `;
}
