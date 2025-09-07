// Calculation functions

export function calculateAttendanceStats() {
  const schedule = JSON.parse(localStorage.getItem("schedule")) || {};
  const attendence = JSON.parse(localStorage.getItem("attendance")) || {};

  const subjectStats = {};

  Object.values(schedule).forEach((day) => {
    day.forEach((subject) => {
      if (!subjectStats[subject]) {
        subjectStats[subject] = { total: 0, present: 0 };
      }
    });
  });

  for (const [date, attendenceMarked] of Object.entries(attendence)) {
    const weekday = new Date(date).toLocaleDateString("en-us", {
      weekday: "long",
    });
    const scheduledSubjects = schedule[weekday] || [];

    scheduledSubjects.forEach((subject) => {
      if (!subjectStats[subject]) {
        subjectStats[subject] = { total: 0, present: 0 };
      }

      const status = attendenceMarked[subject];

      if (status == "cancelled") {
        return;
      }

      subjectStats[subject].total += 1;

      if (status === "present") {
        subjectStats[subject].present += 1;
      }
    });
  }

  let totalClasses = 0;
  let totalPresent = 0;

  for (const subject in subjectStats) {
    const { total, present } = subjectStats[subject];
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    let canSkip = 0;
    let needAttend = 0;
    let advice = "";

    if (percentage >= 75) {
      canSkip = present - Math.ceil(0.75 * total);
      advice =
        canSkip > 0
          ? `You can miss ${canSkip} more class${canSkip > 1 ? `es` : ``}.`
          : `You are above or at 75%.`;
    } else {
      needAttend = Math.ceil((0.75 * total - present) / 0.25);
      advice = `You need to attend ${needAttend} class${
        needAttend > 1 ? "es" : ""
      }.`;
    }

    subjectStats[subject] = {
      total,
      present,
      percentage,
      canSkip,
      needAttend,
      advice,
    };

    totalClasses += total;
    totalPresent += present;
  }

  const overallPercentage =
    totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0;

  return { overallPercentage, stats: subjectStats };
}
