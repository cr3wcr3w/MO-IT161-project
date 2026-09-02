import { showPopup } from "../../../shared/components/popup";
import { responsiveTypography } from "../../../shared/components/typography";

const html = String.raw;

function setFormDisabledState(form: HTMLFormElement, disabled: boolean): void {
  form.querySelectorAll<HTMLInputElement>("input, button").forEach((element) => {
    element.disabled = disabled;
  });

  document
    .querySelectorAll<HTMLAnchorElement>('a[href="/signin"], a[href="/signup"]')
    .forEach((link) => {
      if (disabled) {
        link.setAttribute("aria-disabled", "true");
        link.tabIndex = -1;
        link.classList.add("pointer-events-none", "opacity-50", "cursor-not-allowed");
        link.onclick = (event) => {
          event.preventDefault();
        };
        return;
      }

      link.setAttribute("aria-disabled", "false");
      link.tabIndex = 0;
      link.classList.remove("pointer-events-none", "opacity-50", "cursor-not-allowed");
      link.onclick = null;
    });
}

export function signinForm(): string {
  return html`
    <form id="signin-form" class="flex flex-col" autocomplete="off">
      <label class="mb-2 ${responsiveTypography.label} font-medium text-slate-700">
        Email
        <input
          id="signin-email"
          name="email"
          type="text"
          placeholder="Enter your email"
          class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
      </label>

      <label class="mb-2 ${responsiveTypography.label} font-medium text-slate-700">
        Password
        <input
          id="signin-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
      </label>

      <button
        type="submit"
        class="${responsiveTypography.button} transition delay-150 duration-300 ease-in-out hover:scale-105 btn h-14 w-full rounded-2xl border-0 bg-slate-950 text-white shadow-xl hover:bg-slate-900 mb-3"
      >
        Sign In
      </button>
    </form>
  `;
}

export function bindSignInForm(): void {
  const form = document.querySelector<HTMLFormElement>("#signin-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    setFormDisabledState(form, true);

    const emailInput = document.querySelector<HTMLInputElement>("#signin-email");
    const passwordInput = document.querySelector<HTMLInputElement>("#signin-password");

    const email = emailInput?.value.trim() ?? "";
    const password = passwordInput?.value ?? "";

    const restoreForm = () => {
      setFormDisabledState(form, false);
    };

    if (!email || !password) {
      console.log("Please fill in both email and password fields");
      showPopup({
        position: "bottom-right",
        header: "Error",
        description: "Please fill in both email and password fields.",
        footer: "",
        closeAfterMs: 3000,
      });
      window.setTimeout(restoreForm, 3000);
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      console.log("Please enter a valid email address");
      showPopup({
        position: "bottom-right",
        header: "Error",
        description: "Please enter a valid email address.",
        footer: "",
        closeAfterMs: 3000,
      });
      window.setTimeout(restoreForm, 3000);
      return;
    }

    console.log("Sign in submitted", {
      email,
      password,
    });

    showPopup({
      position: "bottom-right",
      header: "Signed in",
      description: "You have successfully signed in.",
      footer: "Welcome back.",
      closeAfterMs: 3000,
    });

    window.setTimeout(restoreForm, 3000);
  });
}
