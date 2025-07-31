// See stats & % calculations

import React, { useEffect, useState } from "react";
import { calculateAttendanceStats } from "../utils/attendanceUtils";

const AttendanceStats = () => {
  const [data, setData] = useState({ overallPercentage: 0, stats: {} });

  useEffect(() => {
    const result = calculateAttendanceStats();
    setData(result);
  }, []);

  const { overallPercentage, stats } = data;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Attendance Stats</h2>

      <div className="mb-6">
        <p className="text-lg font-medium">
          <span className="text-gray-700">Overall Attendance :</span>{" "}
          <span
            className={`font-bold ${
              overallPercentage < 75 ? "text-red-500" : "text-green-600"
            }`}
          >
            {overallPercentage}%
          </span>
        </p>
      </div>

      {Object.keys(stats).length === 0 ? (
        <p className="text-gray-500">No Attendance Data available..</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Present</th>
              <th className="p-2 border">%</th>
              <th className="p-2 border">Advice</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(stats).map(([subject, s]) => (
              <tr key={subject}>
                <td className="p-2 border">{subject}</td>
                <td className="p-2 border text-center">{s.total}</td>
                <td className="p-2 border text-center">{s.present}</td>
                <td className="p-2 border text-center">{s.percentage}%</td>
                <td className="p-2 border text-sm">{s.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceStats;
