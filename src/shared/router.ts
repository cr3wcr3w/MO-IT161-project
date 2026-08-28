import { renderDashboard } from "../routes/dashboard.ts";
import { renderHome } from "../routes/home.ts";
import { renderNav } from "./components/nav";

const html = String.raw;

// Read the route
function currentRoute(): string[] {
  const currentUrl = window.location.href;

  const parts = currentUrl.split("/");
  const route = "/" + parts.slice(3).join("/");
  return route.split("/").filter(Boolean);
}

function renderRoute(): void {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) {
    return;
  }

  const route = currentRoute();
  console.log(`Rendering route: ${route[0]}`);
  let page: string;
  switch (route[0]) {
    case undefined:
      page = renderHome();
      break;
    case "dashboard":
      page = renderNav(renderDashboard());
      break;
    case "reports":
      page = renderNav(renderDashboard());
      break;
    default:
      page = `<h1>404 Not Found</h1>`;
  }
  console.log(`Rendering page for route: ${route[0]}`);

  app.innerHTML = html`
    ${route}
    <main>${page}</main>
  `;
}

export function startRouter(): void {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
