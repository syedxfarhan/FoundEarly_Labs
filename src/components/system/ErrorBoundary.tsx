"use client";

import * as React from "react";

import { useT } from "@/lib/content";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  const t = useT();

  return (
    <div
      role="alert"
      className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background px-6 text-center"
    >
      <h1 className="text-h2 text-foreground">{t("error.boundary.title")}</h1>
      <p className="max-w-md text-body text-muted-foreground">{t("error.boundary.description")}</p>
      <button
        type="button"
        onClick={onRetry}
        className="min-h-touch rounded-md bg-brand px-4 text-body font-medium text-brand-foreground transition-colors duration-fast hover:bg-brand-hover"
      >
        {t("error.boundary.retry")}
      </button>
    </div>
  );
}

/**
 * Root error boundary — prevents a white-screen mid-demo.
 * Fallback is intentionally calm and non-technical (docs/06 errors).
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return <ErrorFallback onRetry={this.handleReset} />;
    }

    return this.props.children;
  }
}
