import { renderDashboard, bindDashboard } from "../../routes/dashboard.ts";
import { bindHomeFilters, renderHome } from "../../routes/home.ts";
import { renderSignIn } from "../../routes/signin.ts";
import { renderSignUp } from "../../routes/signup.ts";
import { bindSignInForm } from "../../feature/signin/components/signin-form.ts";
import { bindSignUpForm } from "../../feature/signup/components/signup-form.ts";
import { renderDashboardNav } from "../components/dashboard-nav.ts";
import { render404 } from "../../routes/404.ts";
import { $users } from "../store/auth.ts";
import { showPopup } from "../components/popup.ts";

const html = String.raw;

export function currentRoute(): string[] {
  return window.location.pathname.split("/").filter(Boolean);
}

export function navigate(path: string) {
  window.history.pushState({}, "", path);
  renderRoute();
}

function renderRoute(): void {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) {
    return;
  }

  const route = currentRoute();
  console.log("Current route:", route);
  let page: string;

  switch (route[0]) {
    case undefined: // home
      page = renderDashboardNav({ authenticated: false }) + renderHome();
      break;
    case "signin":
      if ($users.get() !== null) {
        navigate("dashboard");
        return;
      }
      page = renderSignIn();
      break;
    case "signup":
      if ($users.get() !== null) {
        navigate("dashboard");
        return;
      }
      page = renderSignUp();
      break;
    case "dashboard":
      if ($users.get() === null) {
        navigate("");
        return;
      }
      page = renderDashboardNav({ authenticated: true }) + renderDashboard();
      break;
    default:
      page = render404();
  }

  app.innerHTML = html`${page}`;

  // binding DOM
  // the routes folder returning as an array of strings, so DOM manipulation cannot be done
  switch (route[0]) {
    case undefined: // home
      bindHomeFilters();
      break;
    case "signin":
      bindSignInForm();
      showPopup({
        position: "bottom-right",
        description:
          "Just put random email and password to sign in, the auth put in session storage to mimic",
      });
      break;
    case "signup":
      bindSignUpForm();
      showPopup({
        position: "bottom-right",
        description: "Signup is not functional, just for demo purpose",
      });
      break;
    case "dashboard":
      bindDashboard();
      showPopup({
        position: "bottom-right",
        description:
          "Theres no dashboard content available, to remove the session storage you can manually remove or click the logout button",
      });
      break;
    default:
      break;
  }
}

// Start the router
// This function sets up the event listener for hash changes and renders the initial route.
export function startRouter(): void {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
