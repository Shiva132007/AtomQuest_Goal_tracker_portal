import { Toaster } from "react-hot-toast";

/**
 * Toast Provider Component - wraps the app to enable notifications
 */
export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#111827",
          color: "#fff",
          borderRadius: "0.75rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
          padding: "1rem 1.5rem",
        },
        success: {
          style: {
            background: "#15803d",
          },
        },
        error: {
          style: {
            background: "#7f1d1d",
          },
        },
      }}
    />
  );
}
