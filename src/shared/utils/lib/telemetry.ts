export interface ErrorContext {
  /** Onde o erro foi capturado (ex.: "route-error", "search-dialog"). */
  source: string;
  [key: string]: unknown;
}

export interface ErrorReporter {
  report(error: unknown, context: ErrorContext): void;
}

const consoleReporter: ErrorReporter = {
  report(error, context) {
    console.error(`[${context.source}]`, error, context);
  }
};

let activeReporter: ErrorReporter = consoleReporter;

/** Ponto de integração com observabilidade (Sentry, Datadog RUM...). */
export function setErrorReporter(reporter: ErrorReporter): void {
  activeReporter = reporter;
}

export function reportRenderError(error: unknown, context: ErrorContext): void {
  try {
    activeReporter.report(error, context);
  } catch {
    // Falha no reporter nunca deve derrubar a aplicação.
  }
}
