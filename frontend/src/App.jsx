import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./Components/common/ToastProvider";
import { ErrorBoundary } from "./Components/common/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;