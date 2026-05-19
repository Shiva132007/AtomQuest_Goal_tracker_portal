import {

  Moon,
  Sun,

} from "lucide-react";

function Navbar({

  darkMode,
  setDarkMode,

}) {

  return (

    <div className="flex justify-between items-center bg-white dark:bg-gray-800 px-8 py-5 shadow-md transition duration-300">

      {/* TITLE */}

      <div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">

          AtomQuest Portal

        </h1>

      </div>

      {/* RIGHT SECTION */}

      <div className="flex items-center gap-5">

        {/* DARK MODE BUTTON */}

        <button

          onClick={() =>
            setDarkMode(
              !darkMode
            )
          }

          className="bg-gray-200 dark:bg-gray-700 p-3 rounded-xl transition hover:scale-105"

        >

          {

            darkMode

              ? (

                <Sun className="text-yellow-400" />

              )

              : (

                <Moon className="text-gray-800" />

              )

          }

        </button>

        {/* USER */}

        <div className="bg-blue-500 text-white px-5 py-2 rounded-xl font-semibold">

          Admin

        </div>

      </div>

    </div>

  );

}

export default Navbar;