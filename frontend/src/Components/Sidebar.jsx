import {

  LayoutDashboard,
  Target,
  CheckSquare,
  BarChart3,
  LogOut,
  Menu,
  X,

} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function Sidebar({

  sidebarOpen,
  setSidebarOpen,

}) {

  const navigate = useNavigate();

  // LOGOUT

  function handleLogout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("userRole");

    navigate("/");

  }

  return (

    <div

      className={

        `

        fixed

        top-0

        left-0

        h-screen

        bg-[#081028]

        text-white

        transition-all

        duration-300

        z-50

        shadow-2xl

        ${sidebarOpen ? "w-64" : "w-20"}

        `
      }

    >

      {/* TOP SECTION */}

      <div className="flex items-center justify-between p-5 border-b border-gray-700">

        {/* TITLE */}

        {sidebarOpen && (

          <h1 className="text-2xl font-bold">

            Goal Tracker

          </h1>

        )}

        {/* TOGGLE BUTTON */}

        <button

          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }

          className="hover:bg-gray-700 p-2 rounded-lg transition"

        >

          {

            sidebarOpen

              ? <X size={24} />

              : <Menu size={24} />

          }

        </button>

      </div>

      {/* NAVIGATION */}

      <nav className="mt-8 flex flex-col gap-3 px-3">

        {/* DASHBOARD */}

        <Link

          to="/admin/dashboard"

          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#1b2a52] transition"

        >

          <LayoutDashboard size={24} />

          {sidebarOpen && (

            <span className="font-medium">

              Dashboard

            </span>

          )}

        </Link>

        {/* GOALS */}

        <Link

          to="/employee/goals"

          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#1b2a52] transition"

        >

          <Target size={24} />

          {sidebarOpen && (

            <span className="font-medium">

              Goals

            </span>

          )}

        </Link>

        {/* CHECKINS */}

        <Link

          to="/manager/dashboard"

          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#1b2a52] transition"

        >

          <CheckSquare size={24} />

          {sidebarOpen && (

            <span className="font-medium">

              Reviews

            </span>

          )}

        </Link>

        {/* ANALYTICS */}

        <Link

          to="/admin/dashboard"

          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#1b2a52] transition"

        >

          <BarChart3 size={24} />

          {sidebarOpen && (

            <span className="font-medium">

              Analytics

            </span>

          )}

        </Link>

      </nav>

      {/* LOGOUT */}

      <div className="absolute bottom-6 w-full px-3">

        <button

          onClick={handleLogout}

          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition"

        >

          <LogOut size={24} />

          {sidebarOpen && (

            <span className="font-medium">

              Logout

            </span>

          )}

        </button>

      </div>

    </div>

  );

}

export default Sidebar;