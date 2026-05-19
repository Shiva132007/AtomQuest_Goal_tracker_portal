import {

  useState,
  useEffect,

} from "react";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {

  // SIDEBAR

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  // DARK MODE

  const [darkMode, setDarkMode] =
    useState(false);

  // APPLY DARK MODE

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add(
        "dark"
      );

    }

    else {

      document.documentElement.classList.remove(
        "dark"
      );

    }

  }, [darkMode]);

  return (

    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition duration-300">

      {/* SIDEBAR */}

      <Sidebar

        sidebarOpen={sidebarOpen}

        setSidebarOpen={setSidebarOpen}

      />

      {/* MAIN CONTENT */}

      <div

        className={

          `

          transition-all
          duration-300
          ease-in-out

          ${sidebarOpen ? "ml-64" : "ml-20"}

          `
        }

      >

        {/* NAVBAR */}

        <Navbar

          darkMode={darkMode}

          setDarkMode={setDarkMode}

        />

        {/* CONTENT */}

        <div className="p-8">

          {children}

        </div>

      </div>

    </div>

  );

}

export default DashboardLayout;