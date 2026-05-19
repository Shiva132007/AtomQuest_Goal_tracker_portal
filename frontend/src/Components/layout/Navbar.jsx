import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogOut, Sun, Moon } from "lucide-react";
import { Button } from "../ui/Button";

/**
 * Modern Navbar Component
 */
export function Navbar({ darkMode, setDarkMode, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-40"
    >
      <div className="px-8 py-4 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-lg"
          >
            AQ
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
              AtomQuest
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Goal Tracker
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Badge */}
          {user && (
            <div className="hidden sm:block">
              <div className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-lg text-sm font-medium">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </div>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-neutral-600" />
            )}
          </motion.button>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            icon={LogOut}
          >
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
