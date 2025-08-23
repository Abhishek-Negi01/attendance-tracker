import React, { useEffect, useState } from "react";
import SubjectAttendenceRow from "./SubjectAttendenceRow";
import { data } from "react-router-dom";

const EditAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  const [todaySubjects, setTodaySubjects] = useState([]);
  const [subjectStatus, setSubjectStatus] = useState({});

  useEffect(() => {
    const schedule = JSON.parse(localStorage.getItem("schedule")) || {};
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};

    const weekDay = new Date(selectedDate).toLocaleDateString("en-us", {
      weekday: "long",
    });

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
    const attendance = JSON.parse(localStorage.getItem("attendence")) || {};
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

    localStorage.setItem("attendence", JSON.stringify(attendance));

    alert("Attendence Updated..");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-center text-2xl font-bold mb-8">Edit Attendence</h1>
      <label className="block mb-8 md:text-center">
        Enter Date :
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded ml-2 p-1"
        />
      </label>

      <div className="space-y-4">
        {todaySubjects.map((subject) => (
          <SubjectAttendenceRow
            subject={subject}
            date={selectedDate}
            status={subjectStatus[subject]}
            onChange={(newStatus) => handleStatusChange(subject, newStatus)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className=" w-full mt-6 bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-600 md:w-1/2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditAttendance;
