import { Component } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";

/**
 * Error Boundary Component to catch React errors
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-4">
          <div className="max-w-md w-full">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-danger-100 dark:bg-danger-900 p-4 rounded-full">
                  <AlertCircle className="text-danger-600 dark:text-danger-400" size={32} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                {this.state.error?.message ||
                  "An unexpected error occurred. Please try again."}
              </p>
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  onClick={this.handleReset}
                  className="flex-1"
                >
                  Try Again
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => (window.location.href = "/")}
                  className="flex-1"
                >
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
