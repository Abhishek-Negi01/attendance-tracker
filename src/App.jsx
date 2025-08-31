import React, { useEffect, useState } from "react";
import ScheduleSetup from "./components/ScheduleSetup";
import DailyAttendance from "./components/DailyAttendance";
import {
  BrowserRouter,
  Link,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";
import AttendanceStats from "./components/AttendanceStats";
import EditAttendance from "./components/EditAttendance";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // dark mode in local storage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkmode") === "true";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkmode", !darkMode);
  };

  const navLinks = [
    { name: "Setup Schedule", path: "/" },
    { name: "Daily Attendance", path: "/attendance" },
    { name: "Stats", path: "/stats" },
    { name: "Edit Attendance", path: "/edit-attendance" },
  ];

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded-lg shadow-md transition-color duration-500  ">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Attendance App</div>

        {/* Dark/Light Toggle */}
        <button
          onClick={toggleDarkMode}
          className="mr-4 md:mr-0 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <FaSun className="w-5 h-5" />
          ) : (
            <FaMoon className="w-5 h-5 " />
          )}
        </button>

        {/* Hamburger button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-blue-600 dark:text-blue-400"
                  : "hover:text-blue-500 dark:hover:text-blue-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-4 flex flex-col space-y-3 overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setIsOpen(!isOpen)}
            className={`font-medium transition-color duration-300 ${
              location.pathname === link.path
                ? "text-blue-600 dark:text-blue-400"
                : "hover:text-blue-500 dark:hover:text-blue-300"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="p-4 transition-colors duration-500 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Navbar />
        {/* Routes */}
        <div className="mt-6">
          <Routes>
            <Route path="/" element={<ScheduleSetup />}></Route>
            <Route path="/attendance" element={<DailyAttendance />} />
            <Route path="/stats" element={<AttendanceStats />} />
            <Route path="/edit-attendance" element={<EditAttendance />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
