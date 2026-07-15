import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error boundary catch:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-br from-[#F4F8FA] to-[#FDF0F4] dark:from-[#0A0D10] dark:to-[#171116] transition-colors duration-300">
          <div className="max-w-md w-full bg-surface-card border border-border-light rounded-2xl p-8 shadow-xl space-y-6">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold text-text-primary">Application Crash Prevented</h1>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                An unexpected rendering error occurred. The application has safely recovered.
              </p>
            </div>
            
            {this.state.error && (
              <pre className="p-4 bg-surface-soft border border-border-light rounded-xl text-left font-mono text-[10px] text-error-red max-h-32 overflow-auto whitespace-pre-wrap leading-relaxed">
                {this.state.error.toString()}
              </pre>
            )}
            
            <button
              onClick={this.handleReset}
              className="w-full bg-primary-blue hover:bg-primary-blue-container text-white py-3 rounded-xl font-display text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
