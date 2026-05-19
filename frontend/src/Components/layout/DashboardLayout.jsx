import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

/**
 * Modern Dashboard Layout with animations
 */
export function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Apply dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        userRole={user?.role || "employee"}
      />

      {/* Main Content */}
      <div
        className="transition-all duration-300"
        style={{
          marginLeft: sidebarOpen ? "16rem" : "5rem",
        }}
      >
        {/* Navbar */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
        />

        {/* Page Content */}
        <main className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
