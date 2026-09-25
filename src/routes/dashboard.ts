import { navigate } from "../shared/lib/router";
import { clearUserSession } from "../shared/store/auth";

const html = String.raw;

export function bindDashboard(): void {
  const logoutButton = document.querySelector<HTMLButtonElement>("#logout-button");

  if (!logoutButton) {
    return;
  }

  logoutButton.addEventListener("click", () => {
    // disabled button
    logoutButton.disabled = true;
    setTimeout(() => {
      clearUserSession();

      navigate("");
    }, 5);
    logoutButton.disabled = false;
  });
}

export function renderDashboard(): string {
  return html`
    <main>
      <p>This is the dashboard page.</p>
      <button id="logout-button" class="btn btn-danger">Logout</button>
    </main>
  `;
}
