import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Target,
  CheckSquare,
  BarChart3,
  Users,
  LogOut,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Modern Sidebar Component
 */
export function Sidebar({ sidebarOpen, setSidebarOpen, userRole }) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  const navItems = {
    employee: [
      { label: "Dashboard", path: "/employee/dashboard", icon: LayoutDashboard },
      { label: "Goals", path: "/employee/goals", icon: Target },
      { label: "Check-ins", path: "/employee/checkins", icon: CheckSquare },
    ],
    manager: [
      { label: "Dashboard", path: "/manager/dashboard", icon: LayoutDashboard },
      { label: "Team Goals", path: "/manager/goals", icon: Target },
      { label: "Reviews", path: "/manager/reviews", icon: BarChart3 },
    ],
    admin: [
      { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Users", path: "/admin/users", icon: Users },
      { label: "Reports", path: "/admin/reports", icon: BarChart3 },
      { label: "Audit Logs", path: "/admin/logs", icon: CheckSquare },
    ],
  };

  const items = navItems[userRole] || navItems.employee;

  const navVariants = {
    open: { x: 0 },
    closed: { x: -100 },
  };

  return (
    <>
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={sidebarOpen ? "open" : "closed"}
        variants={{
          open: { width: "16rem" },
          closed: { width: "5rem" },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-screen bg-gradient-dark text-white border-r border-neutral-700 z-50 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-700">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap size={18} />
              </div>
              <span className="font-bold text-lg">Goal Tracker</span>
            </motion.div>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-neutral-700 p-2 rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-2 px-3">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary-600 text-white shadow-lg"
                      : "text-neutral-300 hover:bg-neutral-800"
                  )}
                >
                  <Icon size={20} />
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="absolute bottom-4 left-3 right-3 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-danger-600/20 text-danger-400 transition-all w-auto"
        >
          <LogOut size={20} />
          {sidebarOpen && <span className="font-medium text-sm">Logout</span>}
        </motion.button>
      </motion.div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}
    </>
  );
}
