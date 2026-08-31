const html = String.raw;

export function render404(): string {
  return html`
    <main class="min-h-screen bg-slate-100">
      <section class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-cyan-600">
          404 Not Found
        </h1>
        <a
          href="/"
          class="mt-4 text-lg text-cyan-700 hover:text-cyan-500 hover:scale-110 transition delay-150 duration-300 ease-in-out"
          >Go back to home</a
        >
      </section>
    </main>
  `;
}
