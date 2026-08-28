const html = String.raw;

export function renderNav(route: string): string {
  const homeCurrent = route === "/reports" ? ' aria-current="page"' : "";
  const dashboardCurrent = route === "/dashboard" ? ' aria-current="page"' : "";

  return html`
    <nav aria-label="Main navigation">
      <a href="/" ${homeCurrent}>Home</a>
      <a href="/dashboard" ${dashboardCurrent}>Dashboard</a>
    </nav>
  `;
}
