const html = String.raw;

export function renderHome(): string {
  return html`
    <main>
      <h1>Home</h1>
      <p>Welcome to the sample website.</p>
      <p>Use the navigation above to visit the dashboard.</p>
    </main>
  `;
}
