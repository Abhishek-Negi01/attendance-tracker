// Calculation functions

export function calculateAttendanceStats() {
  const schedule = JSON.parse(localStorage.getItem("schedule")) || {};
  const attendance = JSON.parse(localStorage.getItem("attendance")) || {};

  const subjectStats = {};

  Object.values(schedule).forEach((subjects) => {
    subjects.forEach((subject) => {
      if (!subjectStats[subject]) {
        subjectStats[subject] = { total: 0, present: 0 };
      }
    });
  });

  for (const [date, attendanceMarked] of Object.entries(attendance)) {
    const weekday = new Date(date).toLocaleDateString("en-us", {
      weekday: "long",
    });
    const scheduledSubjects = schedule[weekday] || [];

    scheduledSubjects.forEach((subject) => {
      if (!subjectStats[subject]) {
        subjectStats[subject] = { total: 0, present: 0 };
      }

      subjectStats[subject].total += 1;
      if (attendanceMarked[subject]) {
        subjectStats[subject].present += 1;
      }
    });
  }

  let totalClasses = 0;
  let totalPresent = 0;

  // analysis

  for (const subject in subjectStats) {
    const { total, present } = subjectStats[subject];
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    subjectStats[subject].percentage = percentage;

    totalClasses += total;
    totalPresent += present;

    // predict

    const requiredAttendance = 0.75 * total;
    if (percentage < 75) {
      const needed = Math.ceil((0.75 * total - present) / 0.25);
      subjectStats[subject].message = `Attend next ${needed} class${
        needed > 1 ? "es" : ""
      } to reach 75%`;
    } else {
      const canMiss = Math.floor((present - 0.75 * total) / 0.75);
      subjectStats[subject].message =
        canMiss > 0
          ? `You can miss ${canMiss} class${
              canMiss > 1 ? "es" : ""
            } and stay above 75%`
          : `You are just above 75%, avoid missing classes`;
    }
  }

  const overallPercentage =
    totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0;

  // for (const subject in subjectStats) {
  //     const {total,present} = subjectStats[subject];
  //     subjectStats[subject].percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  // }

  return { overallPercentage, stats: subjectStats };
}
