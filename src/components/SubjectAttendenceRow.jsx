// mark class cancel or not..

import React from "react";

const SubjectAttendanceRow = ({ subject, date, status, onChange }) => {
  const handleChange = (newStatus) => {
    onChange(newStatus);
  };

  return (
    <div className="border rounded-lg p-4 m-2 shadow-sm bg-white flex flex-col">
      {/* <span className="w-24 font-medium">{date}</span> */}
      {/* Subject Name */}
      <p className="font-semibold text-lg mb-3">{subject}</p>

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
          <span>Present</span>
        </label>

        <label className="flex items-center cursor-pointer space-x-2">
          <input
            type="radio"
            name={`${subject}-${date}`}
            checked={status === "absent"}
            onChange={() => handleChange("absent")}
            className="accent-red-500"
          />
          <span>Absent</span>
        </label>

        <label className="flex items-center cursor-pointer space-x-2">
          <input
            type="radio"
            name={`${subject}-${date}`}
            checked={status === "cancelled"}
            onChange={() => handleChange("cancelled")}
            className="accent-yellow-500"
          />
          <span>Cancelled</span>
        </label>
      </div>
    </div>
  );
};

export default SubjectAttendanceRow;
