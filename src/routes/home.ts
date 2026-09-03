import reports from "../data/api/v1/public/reports.json";
import { renderTypography } from "../shared/components/typography";

const html = String.raw;

type Report = {
  id: string;
  title: string;
  severity: string;
  status: string;
  DisclosedOn: string;
};

type ReportFilters = {
  query?: string;
  status?: string;
  severity?: string;
  sort?: "newest" | "oldest" | "severity";
};

const severityRank: Record<string, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

const severityClasses: Record<string, string> = {
  critical: "badge-error",
  high: "badge-warning",
  medium: "badge-warning",
  low: "badge-success",
};

const statusClasses: Record<string, string> = {
  open: "badge-info",
  triaged: "badge-secondary",
  resolved: "badge-success",
  closed: "badge-neutral",
};

export function getReports({
  query = "",
  status = "",
  severity = "",
  sort = "newest",
}: ReportFilters = {}): Report[] {
  const normalizedQuery = query.trim().toLowerCase();

  return reports
    .filter((report) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        report.id.toLowerCase().includes(normalizedQuery) ||
        report.title.toLowerCase().includes(normalizedQuery);
      const matchesStatus = status.length === 0 || report.status === status;
      const matchesSeverity = severity.length === 0 || report.severity === severity;

      return matchesQuery && matchesStatus && matchesSeverity;
    })
    .sort((firstReport, secondReport) => {
      if (sort === "severity") {
        return severityRank[secondReport.severity] - severityRank[firstReport.severity];
      }

      const firstDate = new Date(firstReport.DisclosedOn).getTime();
      const secondDate = new Date(secondReport.DisclosedOn).getTime();
      return sort === "oldest" ? firstDate - secondDate : secondDate - firstDate;
    });
}

export function bindHomeFilters(): void {
  const searchInput = document.querySelector<HTMLInputElement>("[data-report-search]");
  const statusInput = document.querySelector<HTMLSelectElement>("[data-report-status]");
  const severityInput = document.querySelector<HTMLSelectElement>("[data-report-severity]");
  const sortInput = document.querySelector<HTMLSelectElement>("[data-report-sort]");
  const rows = document.querySelector<HTMLTableSectionElement>("[data-report-rows]");

  if (!searchInput || !statusInput || !severityInput || !sortInput || !rows) {
    return;
  }

  const updateRows = (): void => {
    rows.innerHTML = renderReportRows(
      getReports({
        query: searchInput.value,
        status: statusInput.value,
        severity: severityInput.value,
        sort: sortInput.value as "newest" | "oldest" | "severity",
      }),
    );
  };

  searchInput.addEventListener("input", updateRows);
  statusInput.addEventListener("change", updateRows);
  severityInput.addEventListener("change", updateRows);
  sortInput.addEventListener("change", updateRows);
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function renderReportRows(reportList: Report[]): string {
  if (reportList.length === 0) {
    return html`
      <tr>
        <td colspan="5" class="px-4 py-12 text-center text-sm text-slate-400">
          No reports match your filters.
        </td>
      </tr>
    `;
  }

  return reportList
    .map(
      (report) => html`
        <tr class="border-b border-white/10 text-sm text-slate-300 last:border-0 hover:bg-white/5">
          <td class="whitespace-nowrap px-4 py-4 font-mono text-xs text-slate-400">${report.id}</td>
          <td class="min-w-64 px-4 py-4 font-medium text-white">${report.title}</td>
          <td class="px-4 py-4">
            <span class="badge ${severityClasses[report.severity]} badge-sm capitalize"
              >${report.severity}</span
            >
          </td>
          <td class="px-4 py-4">
            <span class="badge ${statusClasses[report.status]} badge-sm capitalize"
              >${report.status}</span
            >
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-right text-slate-400">
            ${formatDate(report.DisclosedOn)}
          </td>
        </tr>
      `,
    )
    .join("");
}

export function renderHome(): string {
  return html`
    <main class="min-h-[calc(100vh-5rem)] bg-slate-950 px-4 py-8 text-white sm:px-8 lg:px-12">
      <section class="mx-auto w-full max-w-7xl">
        <div class="mb-7">
          ${renderTypography({
            as: "h1",
            variant: "display",
            className: "font-bold text-white",
            content: "Public Reports",
          })}
          ${renderTypography({
            variant: "bodySmall",
            className: "mt-2 max-w-2xl text-slate-300",
            content: "Browse and search publicly disclosed incident reports.",
          })}
        </div>

        <div id="report-filters" class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label
            class="input input-bordered flex h-11 w-full items-center gap-2 border-white/15 bg-slate-900 text-white shadow-sm sm:max-w-md"
          >
            <svg
              class="h-4 w-4 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m20 20-4-4"></path>
            </svg>
            <span class="sr-only">Search reports</span>
            <input
              data-report-search
              type="search"
              placeholder="Search reports by title or ID..."
              class="grow text-sm placeholder:text-slate-500 focus:outline-none"
            />
          </label>
          <select
            data-report-status
            class="select select-bordered h-11 w-full border-white/15 bg-slate-900 text-sm text-slate-200 shadow-sm sm:w-40"
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="triaged">Triaged</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            data-report-severity
            class="select select-bordered h-11 w-full border-white/15 bg-slate-900 text-sm text-slate-200 shadow-sm sm:w-40"
          >
            <option value="">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            data-report-sort
            class="select select-bordered h-11 w-full border-white/15 bg-slate-900 text-sm text-slate-200 shadow-sm sm:w-44"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="severity">Highest severity</option>
          </select>
        </div>

        <div
          class="overflow-x-auto rounded-xl border border-white/10 bg-slate-900 shadow-xl shadow-black/20"
        >
          <table class="table table-zebra table-sm min-w-160">
            <caption class="sr-only">
              Publicly disclosed incident reports
            </caption>
            <thead>
              <tr class="border-b border-white/10 text-xs uppercase tracking-normal text-slate-400">
                <th class="px-4 py-4 font-semibold">ID</th>
                <th class="px-4 py-4 font-semibold">Title</th>
                <th class="px-4 py-4 font-semibold">Severity</th>
                <th class="px-4 py-4 font-semibold">Status</th>
                <th class="px-4 py-4 text-right font-semibold">Disclosed On</th>
              </tr>
            </thead>
            <tbody data-report-rows>
              ${renderReportRows(getReports())}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  `;
}
