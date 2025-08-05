import React from "react";
import ScheduleSetup from "./components/ScheduleSetup";
import DailyAttendance from "./components/DailyAttendance";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import AttendanceStats from "./components/AttendanceStats";
import EditAttendance from "./components/EditAttendance";

const App = () => {
  return (
    <BrowserRouter>
      <div className="p-4">
        <nav className="bg-gray-300 mb-4 flex flex-col align items-start overflow-hidden md:flex-row justify-between ">
          <Link to="/" className="text-blue-500 hover:underline">
            Setup Schedule
          </Link>
          <Link to="/attendance" className="text-blue-500 hover:underline">
            Daily Attendance
          </Link>
          <Link to="/stats" className="text-blue-500 hover:underline">
            Stats
          </Link>
          <Link to="/edit-attendance" className="text-blue-500 hover:underline">
            Edit Attendance
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<ScheduleSetup />}></Route>
          <Route path="/attendance" element={<DailyAttendance />} />
          <Route path="/stats" element={<AttendanceStats />} />
          <Route path="/edit-attendance" element={<EditAttendance />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
