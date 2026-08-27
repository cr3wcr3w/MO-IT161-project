const html = String.raw;

export function renderDashboard(): string {
  return html`
    <main>
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>
      <ul>
        <li>Open tasks: 12</li>
        <li>In progress: 4</li>
        <li>Completed this week: 28</li>
      </ul>
    </main>
  `;
}
