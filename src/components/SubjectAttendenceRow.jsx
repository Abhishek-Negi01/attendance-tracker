// mark class cancel or not..

import React from "react";

const SubjectAttendenceRow = ({ subject, date, status, onChange }) => {
  const handleChange = (newStatus) => {
    onChange(newStatus);
  };

  return (
    <div className="flex  items-center spance-x-4 border-b md:flex-row">
      <span className="w-24 font-medium">{date}</span>
      <span className="w-32">{subject}</span>

      <label className="flex items-center space-x-2">
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
  );
};

export default SubjectAttendenceRow;
