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
    <div>
      <h2>
        Mark Attendence for {dayName} {dateKey}
      </h2>
      {todaySubjects.length === 0 ? (
        <p>No Classes Scheduled for Today..</p>
      ) : (
        todaySubjects.map((subject) => (
          <div>
            <p>{subject}</p>
            <label>
              <input
                type="radio"
                name={subject}
                value="present"
                checked={(attendance[subject] = "present")}
                onClick={(e) => handleChange(subject, "present")}
              />
              <span>Present</span>
            </label>

            <label>
              <input
                type="radio"
                name={subject}
                value="absent"
                checked={(attendance[subject] = "absent")}
              />
            </label>
          </div>
        ))
      )}
    </div>
  );
};

export default DailyAttendance;
