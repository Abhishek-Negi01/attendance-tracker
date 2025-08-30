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
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
        {" "}
        Subject and Weekly schedule Setup
      </h2>
      {/* subject input */}

      <div className="flex flex-col md:flex-row gap-3 mb-8 ">
        <input
          className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none overflow-hidden  md:basis-2/3"
          type="text"
          placeholder="Enter New Subject (e.g. computer Networks)"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSubject()}
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto  md:basis-1/3"
          onClick={addSubject}
        >
          Add
        </button>
      </div>

      {/* Weekly schedule Assignment */}
      <div className="space-y-6">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition "
          >
            <h3 className="font-semibold text-lg mb-3">{day}</h3>
            <div className="flex flex-col sm:flex-row sm:flex-wrap  gap-3 ">
              {subjects.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Add Subjects to assign this day.
                </p>
              ) : (
                subjects.map((subject) => (
                  <label
                    key={subject}
                    className="flex  items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(schedule[day] || []).includes(subject)}
                      onChange={() => toggleSubjectForDay(day, subject)}
                      className="accent-blue-500"
                    />
                    <span>{subject}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleSetup;
