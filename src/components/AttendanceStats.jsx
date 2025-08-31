// See stats & % calculations

import React, { useEffect, useState } from "react";
import { calculateAttendanceStats } from "../utils/attendanceUtils";
// import Table from "react-bootstrap/Table";

const AttendanceStats = () => {
  const [data, setData] = useState({ overallPercentage: 0, stats: {} });

  useEffect(() => {
    const result = calculateAttendanceStats();
    setData(result);
  }, []);

  const { overallPercentage, stats } = data;

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            {/* <th>S.No</th> */}
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Percentage</th>
            <th className="p-3 text-left">Present</th>
            <th className="p-3 text-left">CanSkip</th>
            <th className="p-3 text-left">needAttend</th>
            <th className="p-3 text-left">Advice</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {Object.entries(stats).map(([subject, s]) => (
            <tr key={subject} className="hover:bg-gray-50 transition">
              <td className="p-3">{subject}</td>
              <td className="p-3  text-center">{s.total}</td>
              <td className="p-3  text-center">{s.present}</td>
              <td className="p-3  text-center">{s.percentage}</td>
              <td className="p-3  text-center">{s.canSkip}</td>
              <td className="p-3  text-center">{s.needAttend}</td>
              <td className="p-3 text-center">{s.advice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceStats;
