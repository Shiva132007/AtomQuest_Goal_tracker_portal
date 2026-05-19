import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { LoadingFallback } from "../Components/common/LoadingFallback";

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const EmployeeDashboard = lazy(() => import("../pages/employee/EmployeeDashboard"));
const Goals = lazy(() => import("../pages/employee/Goals"));
const Checkins = lazy(() => import("../pages/employee/Checkins"));
const ManagerDashboard = lazy(() => import("../pages/manager/ManagerDashboard"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const Users = lazy(() => import("../pages/admin/Users"));
const Reports = lazy(() => import("../pages/admin/Reports"));
const AuditLogs = lazy(() => import("../pages/admin/AuditLogs"));
import ProtectedRoute from "../Components/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>

        {/* AUTH */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* EMPLOYEE */}

        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute allowedRole="employee">

              <EmployeeDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/goals"
          element={
            <ProtectedRoute allowedRole="employee">

              <Goals />

            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/checkins"
          element={
            <ProtectedRoute allowedRole="employee">

              <Checkins />

            </ProtectedRoute>
          }
        />

        {/* MANAGER */}

        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute allowedRole="manager">

              <ManagerDashboard />

            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="admin">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRole="admin">
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/logs"
          element={
            <ProtectedRoute allowedRole="admin">
              <AuditLogs />
            </ProtectedRoute>
          }
        />

      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;