import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Protected Route Wrapper Component
 */
function ProtectedRoute({ children, allowedRole }) {
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // No authentication
  if (!token || !userRole) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch
  if (userRole !== allowedRole) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            You don't have permission to access this page.
          </p>
        </div>
      </motion.div>
    );
  }

  return children;
}

export default ProtectedRoute;