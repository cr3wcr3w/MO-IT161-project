import { showPopup } from "../../../shared/components/popup";
import { responsiveTypography } from "../../../shared/components/typography";
import { navigate } from "../../../shared/lib/router";
import { setUserSession } from "../../../shared/store/auth";

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

export function signupForm(): string {
  return html`
    <form id="signup-form" class="flex flex-col" autocomplete="off">
      <label class="mb-2 ${responsiveTypography.label} font-medium text-slate-700">
        Full name
        <input
          id="signup-full-name"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
      </label>

      <label class="mb-2 ${responsiveTypography.label} font-medium text-slate-700">
        Email
        <input
          id="signup-email"
          name="email"
          type="text"
          placeholder="Enter your email"
          class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
      </label>

      <label class="mb-2 ${responsiveTypography.label} font-medium text-slate-700">
        Password
        <input
          id="signup-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
      </label>

      <label class="mb-2 ${responsiveTypography.label} font-medium text-slate-700">
        Confirm password
        <input
          id="signup-confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          class="input input-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        />
      </label>

      <label class="mb-2 ${responsiveTypography.label} font-medium text-slate-700">
        Sign up as
        <select
          id="signup-role"
          name="role"
          class="select select-bordered h-14 w-full rounded-xl border-slate-200 bg-white/70 text-slate-800 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
        >
          <option value="researcher">Researcher</option>
          <option value="triage">Triage</option>
        </select>
      </label>

      <button
        type="submit"
        class="${responsiveTypography.button} transition delay-150 duration-300 ease-in-out hover:scale-105 btn h-14 w-full rounded-2xl border-0 bg-slate-950 text-white shadow-xl hover:bg-slate-900 mb-3"
      >
        Sign Up
      </button>
    </form>
  `;
}

export function bindSignUpForm(): void {
  const form = document.querySelector<HTMLFormElement>("#signup-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    setFormDisabledState(form, true);

    const fullNameInput = document.querySelector<HTMLInputElement>("#signup-full-name");
    const emailInput = document.querySelector<HTMLInputElement>("#signup-email");
    const passwordInput = document.querySelector<HTMLInputElement>("#signup-password");
    const confirmPasswordInput = document.querySelector<HTMLInputElement>(
      "#signup-confirm-password",
    );
    const roleInput = document.querySelector<HTMLSelectElement>("#signup-role");

    const fullName = fullNameInput?.value.trim() ?? "";
    const email = emailInput?.value.trim() ?? "";
    const password = passwordInput?.value ?? "";
    const confirmPassword = confirmPasswordInput?.value ?? "";
    const role = roleInput?.value ?? "researcher";

    const restoreForm = () => {
      setFormDisabledState(form, false);
    };

    if (!fullName || !email || !password || !confirmPassword) {
      console.log("Please fill in all fields");
      showPopup({
        position: "bottom-right",
        header: "Error",
        description: "Please fill in all fields.",
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

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      showPopup({
        position: "bottom-right",
        header: "Error",
        description: "Passwords do not match. Please try again.",
        footer: "",
        closeAfterMs: 3000,
      });
      window.setTimeout(restoreForm, 3000);
      return;
    }

    console.log("Form submitted", {
      fullName,
      email,
      password,
      role,
    });

    showPopup({
      position: "bottom-right",
      header: "Account created",
      description: "Your account has been created successfully.",
      footer: "You can now sign in with your new credentials.",
      closeAfterMs: 3000,
    });

    setUserSession({
      fullName: fullName,
      email: email,
      role: role,
      verified: true,
      authenticated: true,
    });

    window.setTimeout(() => {
      restoreForm();
      navigate("/dashboard");
    }, 1500);
  });
}
