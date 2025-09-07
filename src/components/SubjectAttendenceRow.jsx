// mark class cancel or not..

import React from "react";

const SubjectAttendanceRow = ({ subject, date, status, onChange }) => {
  const handleChange = (newStatus) => {
    onChange(newStatus);
  };

  return (
    <div className="border rounded-lg p-4 m-2 shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex flex-col transition-colors">
      {/* <span className="w-24 font-medium">{date}</span> */}
      {/* Subject Name */}
      <p className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">
        {subject}
      </p>

      {/* Attendance Options */}
      <div
        className="flex flex-col sm:flex-row sm:items-center
      sm:space-x-6 gap-3 "
      >
        <label className="flex items-center cursor-pointer space-x-2 ">
          <input
            type="radio"
            name={`{${subject}-${date}}`}
            checked={status === "present"}
            onChange={() => handleChange("present")}
            className="accent-green-500"
          />
          <span className="text-gray-800 dark:text-gray-200">Present</span>
        </label>

        <label className="flex items-center cursor-pointer space-x-2">
          <input
            type="radio"
            name={`${subject}-${date}`}
            checked={status === "absent"}
            onChange={() => handleChange("absent")}
            className="accent-red-500"
          />
          <span className="text-gray-800 dark:text-gray-200">Absent</span>
        </label>

        <label className="flex items-center cursor-pointer space-x-2">
          <input
            type="radio"
            name={`${subject}-${date}`}
            checked={status === "cancelled"}
            onChange={() => handleChange("cancelled")}
            className="accent-yellow-500"
          />
          <span className="text-gray-800 dark:text-gray-200">Cancelled</span>
        </label>
      </div>
    </div>
  );
};

export default SubjectAttendanceRow;
