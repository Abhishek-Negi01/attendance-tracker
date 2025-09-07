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
      <table className="min-w-full border-collapse bg-white dark:bg-gray-800  shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 dark:bg-blue-600 text-white">
          <tr>
            {/* <th>S.No</th> */}
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-center">Total</th>
            <th className="p-3 text-center">Present</th>
            <th className="p-3 text-center">Percentage</th>
            <th className="p-3 text-center">CanSkip</th>
            <th className="p-3 text-center">needAttend</th>
            <th className="p-3 text-center">Advice</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {Object.entries(stats).map(([subject, s]) => (
            <tr
              key={subject}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <td className="p-3 font-medium text-gray-800 dark:text-gray-200">
                {subject}
              </td>
              <td className="p-3 text-center text-gray-700 dark:text-gray-300">
                {s.total}
              </td>
              <td className="p-3  text-center text-gray-700 dark:text-gray-300">
                {s.present}
              </td>

              {/* Percentage with different */}
              <td
                className={`p-3 text-center font-semibold ${
                  s.percentage >= 75
                    ? "text-green-600 dark:text-green-400"
                    : s.percentage >= 50
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {s.percentage}
              </td>
              <td className="p-3  text-center text-gray-700 dark:text-gray-300">
                {s.canSkip}
              </td>
              <td className="p-3  text-center text-gray-700 dark:text-gray-300">
                {s.needAttend}
              </td>
              {/* <td
                className={`p-3 text-center italic ${
                  s.advice.includes("Good")
                    ? "text-green-600 dark:text-green-400"
                    : s.advice.includes("warning")
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {s.advice}
              </td> */}
              <td className="p-3 text-center italic text-gray-700 dark:text-gray-300">
                {s.advice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceStats;
