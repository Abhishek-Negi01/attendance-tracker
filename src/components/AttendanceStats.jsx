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
    <div>
      <table>
        <thead>
          <tr>
            {/* <th>S.No</th> */}
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Present</th>
            <th className="p-2 border">Percentage</th>
            <th className="p-2 border">CanSkip</th>
            <th className="p-2 border">needAttend</th>
            <th className="p-2 border">Advice</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(stats).map(([subject, s]) => (
            <tr key={subject}>
              <td className="p-2 border">{subject}</td>
              <td className="p-2 border text-center">{s.total}</td>
              <td className="p-2 border text-center">{s.present}</td>
              <td className="p-2 border text-center">{s.percentage}</td>
              <td className="p-2 border text-center">{s.canSkip}</td>
              <td className="p-2 border text-center">{s.needAttend}</td>
              <td className="p-2 border text-center">{s.advice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceStats;
