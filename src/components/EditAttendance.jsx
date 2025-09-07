import React, { useEffect, useState } from "react";
import { FaCalendarTimes } from "react-icons/fa";
import SubjectAttendanceRow from "./SubjectAttendenceRow";
import { data } from "react-router-dom";

const EditAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  const [todaySubjects, setTodaySubjects] = useState([]);
  const [subjectStatus, setSubjectStatus] = useState({});
  const [weekDay, setWeekDay] = useState("");

  useEffect(() => {
    const schedule = JSON.parse(localStorage.getItem("schedule")) || {};
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};

    const weekDay = new Date(selectedDate).toLocaleDateString("en-us", {
      weekday: "long",
    });

    setWeekDay(weekDay);

    const subjects = schedule[weekDay] || [];
    setTodaySubjects(subjects);

    const savedStatus = attendance[selectedDate] || {};

    const initialStatus = {};

    subjects.forEach((subject) => {
      const value = savedStatus[subject];
      if (value === "present") {
        initialStatus[subject] = "present";
      } else if (value === "cancelled") {
        initialStatus[subject] = "cancelled";
      } else {
        initialStatus[subject] = "absent";
      }
    });

    setSubjectStatus(initialStatus);
  }, [selectedDate]);

  const handleStatusChange = (subject, newStatus) => {
    setSubjectStatus((prev) => ({
      ...prev,
      [subject]: newStatus,
    }));
  };

  const handleSave = () => {
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};
    attendance[selectedDate] = {};

    Object.entries(subjectStatus).forEach(([subject, status]) => {
      if (status === "present") {
        attendance[selectedDate][subject] = "present";
      } else if (status === "cancelled") {
        attendance[selectedDate][subject] = "cancelled";
      } else {
        attendance[selectedDate][subject] = "absent";
      }
    });

    localStorage.setItem("attendance", JSON.stringify(attendance));

    alert("Attendance Updated..");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Heading */}
      <h1 className="text-center text-2xl md:text-3xl font-bold mb-8 dark:text-gray-100">
        Edit Attendence
      </h1>

      {/* Date Picker */}
      <div className="flex justify-center mb-8">
        <label className="flex flex-col sm:flex-row items-center gap-2 text-center">
          <span className="font-medium dark:text-gray-200">Select Date:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus-ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 border-gray-300  dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </label>
      </div>

      {/* Subject Rows */}

      {todaySubjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-6 space-y-3">
          <FaCalendarTimes className="w-12 h-12 text-yellow-600 dark:text-yellow-400 " />
          <p className=" text-lg font-medium text-yellow-700 dark:text-yellow-400">
            No classes scheduled for {weekDay}.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {todaySubjects.map((subject) => (
            <SubjectAttendanceRow
              key={subject}
              subject={subject}
              date={selectedDate}
              status={subjectStatus[subject]}
              onChange={(newStatus) => handleStatusChange(subject, newStatus)}
            />
          ))}
        </div>
      )}

      {/* Save Button */}
      {todaySubjects.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSave}
            className="w-full md:w-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EditAttendance;
