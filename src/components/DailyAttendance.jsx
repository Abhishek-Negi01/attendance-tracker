import React, { useState } from "react";

const DailyAttendance = () => {
  const today = new Date();
  const dateKey = today.toISOString().split("T")[0];
  const dayName = today.toLocaleDateString("en-us", { weekday: "long" });

  const schedule = JSON.parse(localStorage.getItem("schedule")) || {};
  const todaySubjects = schedule[dayName] || [];

  const [attendance, setAttendence] = useState({});

  const handleChange = (subject, value) => {
    setAttendence((prev) => ({
      ...prev,
      [subject]: value,
    }));
  };

  const saveAttendence = () => {
    const allData = JSON.parse(localStorage.getItem("attendence")) || {};
    allData[dateKey] = attendance;
    localStorage.setItem("attendence", JSON.stringify(allData));
    alert("Attendence Saved..");
  };

  return (
    <div className="p-4 max-w-xl mx-auto ">
      <h2 className="text-center text-2xl">
        Mark Attendence for {dayName} {dateKey}
      </h2>
      {todaySubjects.length === 0 ? (
        <p>No Classes Scheduled for Today..</p>
      ) : (
        todaySubjects.map((subject) => (
          <div className="border rounded p-3 m-2 shadow-sm">
            <p className="font-semibold">{subject}</p>
            <div className="flex  mt-4 space-x-4">
              {/*justify-between items-center*/}
              <label>
                <input
                  type="radio"
                  name={subject}
                  value="present"
                  checked={attendance[subject] === "present"}
                  onClick={(e) => handleChange(subject, "present")}
                />
                <span className="ml-1">Present</span>
              </label>
              <label>
                <input
                  type="radio"
                  name={subject}
                  value="absent"
                  checked={attendance[subject] === "absent"}
                  onClick={(e) => handleChange(subject, "absent")}
                />
                <span className="ml-1">Absent</span>
              </label>
              <label>
                <input
                  type="radio"
                  name={subject}
                  value="cancelled"
                  checked={attendance[subject] === "cancelled"}
                  onClick={(e) => handleChange(subject, "cancelled")}
                />
                <span className="ml-1">Cancelled</span>
              </label>
            </div>
          </div>
        ))
      )}

      {todaySubjects.length > 0 && (
        <button
          onClick={saveAttendence}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Attendance
        </button>
      )}
    </div>
  );
};

export default DailyAttendance;
