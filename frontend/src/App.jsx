import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./components/common/ToastProvider";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;