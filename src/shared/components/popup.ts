import { responsiveTypography } from "./typography";

const html = String.raw;

type PopupPosition = "center" | "bottom-right" | "bottom-left" | "top-right" | "top-left";

export type PopupOptions = {
  position?: PopupPosition;
  header?: string;
  description?: string;
  footer?: string;
  closeAfterMs?: number;
};

const popupPositionClasses: Record<PopupPosition, string> = {
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "right-5 bottom-5",
  "bottom-left": "left-5 bottom-5",
  "top-right": "right-5 top-5",
  "top-left": "left-5 top-5",
};

export function renderPopup({
  position = "center",
  header = "Notice",
  description = "This is a popup message.",
  footer = "",
}: PopupOptions = {}): string {
  const footerMarkup = footer
    ? `<div class="mt-4 border-t border-slate-200 pt-3 ${responsiveTypography.meta} font-medium text-slate-500">${footer}</div>`
    : "";

  return html`
    <div
      class="fixed z-50 ${popupPositionClasses[position]} w-[min(90vw,24rem)] rounded-2xl border border-slate-200 bg-white p-5 shadow-gray-600"
      role="alertdialog"
      aria-live="polite"
      aria-modal="false"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p
            class="${responsiveTypography.meta} font-semibold uppercase tracking-[0.12em] text-sky-700"
          >
            ${header}
          </p>
        </div>
        <button
          type="button"
          data-close-popup
          class="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close popup"
        >
          ×
        </button>
      </div>

      <p class="mt-3 ${responsiveTypography.bodySmall} text-slate-600">${description}</p>
      ${footerMarkup}
    </div>
  `;
}

export function showPopup(options: PopupOptions = {}): void {
  const { closeAfterMs = 4000 } = options;

  const popupWrapper = document.createElement("div");
  popupWrapper.innerHTML = renderPopup(options);

  const popupElement = popupWrapper.firstElementChild as HTMLElement | null;

  if (!popupElement) {
    return;
  }

  document.body.appendChild(popupElement);

  const dismiss = () => {
    popupElement.remove();
  };

  const closeButton = popupElement.querySelector<HTMLButtonElement>("[data-close-popup]");
  closeButton?.addEventListener("click", dismiss);

  if (closeAfterMs > 0) {
    window.setTimeout(dismiss, closeAfterMs);
  }
}
