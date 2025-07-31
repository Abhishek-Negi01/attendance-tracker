// Mark daily attendance

import React, { useEffect, useState } from "react";

const useSchedule = () => {
  const [schedule, setSchedule] = useState(() => {
    return JSON.parse(localStorage.getItem("schedule")) || {};
  });

  useEffect(() => {
    const checkForUpdates = () => {
      const latestSchedule = JSON.parse(localStorage.getItem("schedule")) || {};
      if (JSON.stringify(latestSchedule) !== JSON.stringify(schedule)) {
        setSchedule(latestSchedule);
      }
    };

    checkForUpdates();

    const intervalId = setInterval(checkForUpdates, 500);

    const handleStorageChange = (e) => {
      if (e.key === "schedule") {
        setSchedule(JSON.parse(e.newValue) || []);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [schedule]);

  return schedule;
};

const DailyAttendance = () => {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-us", { weekday: "long" });
  // console.log(dayName);

  const dateKey = today.toISOString().split("T")[0]; // format "2025 - 07 - 26"

  const [attendance, setAttendance] = useState({});
  const [loaded, setLoaded] = useState(false);

  const schedule = useSchedule();
  const subjectToday = schedule[dayName] || [];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("attendance")) || {};
    if (saved[dateKey]) {
      setAttendance(saved[dateKey]);
    }

    setLoaded(true);
  }, [dateKey]);

  const handleToggle = (subject) => {
    setAttendance((prev) => ({
      ...prev,
      [subject]: !prev[subject],
    }));
  };

  function saveAttendance() {
    const allData = JSON.parse(localStorage.getItem("attendance")) || {};
    allData[dateKey] = attendance;
    localStorage.setItem("attendance", JSON.stringify(allData));
    alert("Attendance saved successfully!");
  }

  if (!loaded) return <p className="text-center mt-10">Loading...</p>;
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Attendance for {dayName} ({dateKey})
      </h2>

      {subjectToday.length === 0 ? (
        <p className="text-gray-500">No classes Scheduled for Today...</p>
      ) : (
        <div className="space-y-4">
          {subjectToday.map((subject) => (
            <label key={subject} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={attendance[subject] || false}
                onChange={() => handleToggle(subject)}
              />
              <span>{subject}</span>
            </label>
          ))}

          <button
            onClick={saveAttendance}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            <span>Save Attendance</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyAttendance;
