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

function normalizeRoutePath(path: string): string {
  const trimmedPath = path.trim();

  if (!trimmedPath || trimmedPath === "/") {
    return "/";
  }

  return trimmedPath.startsWith("/") ? trimmedPath : `/${trimmedPath}`;
}

export function currentRoute(): string[] {
  return window.location.pathname.split("/").filter(Boolean);
}

export function navigate(path: string) {
  const nextPath = normalizeRoutePath(path);
  const currentUrl = `${window.location.pathname}${window.location.search}`;

  if (currentUrl === nextPath) {
    renderRoute();
    return;
  }

  window.history.pushState({}, "", nextPath);
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
        navigate("/dashboard");
        return;
      }
      page = renderSignIn();
      break;
    case "signup":
      if ($users.get() !== null) {
        navigate("/dashboard");
        return;
      }
      page = renderSignUp();
      break;
    case "dashboard":
      if ($users.get() === null) {
        navigate("/");
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
        description: "After you Signup, this will redirect you to dashboard page",
      });
      break;
    case "dashboard":
      bindDashboard();
      showPopup({
        position: "bottom-right",
        description:
          "Dashboard page is protected, you need to sign in first to access this page, and you can sign out by clicking the logout button",
      });
      break;
    default:
      break;
  }
}

// Start the router
// This function sets up the event listener for browser navigation and renders the initial route.
export function startRouter(): void {
  window.addEventListener("popstate", renderRoute);
  renderRoute();
}
