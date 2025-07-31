//  Create subjects & assign to days

import React, { useEffect, useState } from "react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ScheduleSetup = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    if (subjects.length > 0) {
      localStorage.setItem("subjects", JSON.stringify(subjects));
    }
  }, [subjects]);

  useEffect(() => {
    if (Object.keys(schedule).length > 0) {
      localStorage.setItem("schedule", JSON.stringify(schedule));
    }
  }, [schedule]);

  useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    const savedSchedule = JSON.parse(localStorage.getItem("schedule")) || {};

    setSubjects(savedSubjects);
    setSchedule(savedSchedule);
  }, []);

  function addSubject() {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject("");
    }
  }

  function toggleSubjectForDay(day, subject) {
    setSchedule((prev) => {
      const currentSubjects = prev[day] || [];
      const updatedSubjects = currentSubjects.includes(subject)
        ? currentSubjects.filter((s) => s !== subject)
        : [...currentSubjects, subject];
      return { ...prev, [day]: updatedSubjects };
    });
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {" "}
        Subject and Weekly schedule Setup
      </h2>
      {/* subject input */}

      <div className="flex gap-2 mb-6">
        <input
          className="border px-4 py-2 rounded w-full"
          type="text"
          placeholder="Enter New Subject (e.g. computer Network)"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSubject()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addSubject}
        >
          Add
        </button>
      </div>

      {/* Weekly schedule Assignment */}

      {daysOfWeek.map((day) => (
        <div key={day} className="mb-4">
          <h3 className="font-semibold mb-2">{day}</h3>
          <div className="flex flex-wrap gap-3">
            {subjects.length === 0 ? (
              <p className="text-gray-500">Add Subjects to assign this day.</p>
            ) : (
              subjects.map((subject) => (
                <label key={subject} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={(schedule[day] || []).includes(subject)}
                    onChange={() => toggleSubjectForDay(day, subject)}
                  />
                  <span>{subject}</span>
                </label>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleSetup;
