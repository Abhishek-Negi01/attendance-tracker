import React, { useState } from "react";

const DailyAttendance = () => {
  const today = new Date();
  const dateKey = today.toISOString().split("T")[0];
  const dayName = today.toLocaleDateString("en-us", { weekday: "long" });

  const schedule = JSON.parse(localStorage.getItem("schedule")) || {};
  const todaySubjects = schedule[dayName] || [];

  const [attendance, setAttendance] = useState({});

  const handleChange = (subject, value) => {
    setAttendance((prev) => ({
      ...prev,
      [subject]: value,
    }));
  };

  const saveAttendance = () => {
    const allData = JSON.parse(localStorage.getItem("attendance")) || {};
    allData[dateKey] = attendance;
    localStorage.setItem("attendance", JSON.stringify(allData));
    alert("Attendance Saved..");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto flex flex-col">
      {/* Heading */}
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
        Mark Attendance for {dayName} {dateKey}
      </h2>
      {todaySubjects.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          No Classes Scheduled for Today..
        </p>
      ) : (
        <div className="space-y-4">
          {todaySubjects.map((subject) => (
            <div
              key={subject}
              className="border rounded-lg p-4   shadow-sm hover:shadow-md transition bg-white"
            >
              {/* Subject name */}
              <p className="font-semibold text-lg mb-3 ">{subject}</p>

              {/* Radio buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 gap-3">
                {/*justify-between items-center*/}
                <label className="flex items-center cursor-pointer space-x-2">
                  <input
                    type="radio"
                    name={subject}
                    value="present"
                    checked={attendance[subject] === "present"}
                    onClick={(e) => handleChange(subject, "present")}
                    className="accent-green-500"
                  />
                  <span>Present</span>
                </label>
                <label className="flex items-center cursor-pointer space-x-2">
                  <input
                    type="radio"
                    name={subject}
                    value="absent"
                    checked={attendance[subject] === "absent"}
                    onClick={(e) => handleChange(subject, "absent")}
                    className="accent-red-500"
                  />
                  <span className="ml-1">Absent</span>
                </label>
                <label className="flex items-center cursor-pointer space-x-2">
                  <input
                    type="radio"
                    name={subject}
                    value="cancelled"
                    checked={attendance[subject] === "cancelled"}
                    onClick={(e) => handleChange(subject, "cancelled")}
                    className="accentyellow-500"
                  />
                  <span className="ml-1">Cancelled</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Save Button */}

      {todaySubjects.length > 0 && (
        <div className="flex justify-center items-center">
          <button
            onClick={saveAttendance}
            className="w-full mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition md:w-1/2 shadow"
          >
            Save Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyAttendance;
