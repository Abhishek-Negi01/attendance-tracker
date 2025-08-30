// mark class cancel or not..

import React from "react";

const SubjectAttendanceRow = ({ subject, date, status, onChange }) => {
  const handleChange = (newStatus) => {
    onChange(newStatus);
  };

  return (
    <div className="border rounded p-3 m-2 shadow-sm flex   space-x-4 border-b flex-col ">
      {/* <span className="w-24 font-medium">{date}</span> */}
      <p className="font-semibold">{subject}</p>

      <div className="flex mt-4 space-x-4">
        <label className="flex items-center space-x-2 ">
          <input
            type="radio"
            name={`{${subject}-${date}}`}
            checked={status === "present"}
            onChange={() => handleChange("present")}
          />
          <span>Present</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={`${subject}-${date}`}
            checked={status === "absent"}
            onChange={() => handleChange("absent")}
          />
          <span>Absent</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={`${subject}-${date}`}
            checked={status === "cancelled"}
            onChange={() => handleChange("cancelled")}
          />
          <span>Cancelled</span>
        </label>
      </div>
    </div>
  );
};

export default SubjectAttendanceRow;
