import { renderDashboard } from "../routes/dashboard.ts";
import { renderHome } from "../routes/home.ts";
import { renderNav } from "./components/nav";

const html = String.raw;

// Read the route after the # in the URL. Hash routing works without a server
// configuration because changing the hash does not reload the page.
function currentRoute(): string {
  return window.location.hash.replace("#", "") || "/";
}

function renderRoute(): void {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) {
    return;
  }

  const route = currentRoute();
  const page = route === "/dashboard" ? renderDashboard() : renderHome();

  // The nav is rendered on every route, while `page` changes based on the hash.
  app.innerHTML = html`${renderNav(route)}${page}`;
}

// To add another route:
// 1. Create a renderer in src/routes, such as renderSettings().
// 2. Import it at the top of this file.
// 3. Add a condition above the home fallback:
//    if (currentRoute() === "/settings") {
//      app.innerHTML = renderSettings();
//      return;
//    }
// 4. Navigate with window.location.hash = "/settings" or href="#/settings".
export function startRouter(): void {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
