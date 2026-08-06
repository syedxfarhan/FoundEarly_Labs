"use client";

import * as React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

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
      return (
        <div
          role="alert"
          className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background px-6 text-center"
        >
          <h1 className="text-h2 text-foreground">Something interrupted this view</h1>
          <p className="max-w-md text-body text-muted-foreground">
            Reload this screen to continue. If this happens during a client meeting, use Demo Reset
            from the presenter controls once available.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="min-h-touch rounded-md bg-brand px-4 text-body font-medium text-brand-foreground transition-colors duration-fast hover:bg-brand-hover"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
