import { renderDashboard } from "../routes/dashboard.ts";
import { renderHome } from "../routes/home.ts";
import { renderSignIn } from "../routes/signin.ts";
import { renderSignUp } from "../routes/signup.ts";
import { renderDashboardNav } from "./components/dashboard-nav.ts";

const html = String.raw;

function currentRoute(): string[] {
  const pathname = new URL(window.location.href).pathname;
  return pathname.split("/").filter(Boolean);
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
    case undefined:
      page = renderHome();
      break;
    case "signin":
      page = renderSignIn();
      break;
    case "signup":
      page = renderSignUp();
      break;
    case "dashboard":
      page = renderDashboardNav(route[0]) + renderDashboard();
      break;
    case "reports":
      page = renderDashboardNav(route[0]) + renderDashboard();
      break;
    default:
      page = `<h1>404 Not Found</h1>`;
  }

  app.innerHTML = html`${page}`;
}

export function startRouter(): void {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
