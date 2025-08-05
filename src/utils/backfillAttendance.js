// fill previous attendances

export function backfillAttendance(fromDateStr = "2025-07-15") {
  const schedule = JSON.parse(localStorage.getItem("schedule")) || {};
  const attendance = JSON.parse(localStorage.getItem("attendance")) || {};

  const fromDate = new Date(fromDateStr);
  const today = new Date();
  today.setDate(today.getDate() - 1); // exclude today

  for (
    let date = new Date(fromDate);
    date <= today;
    date.setDate(date.getDate() + 1)
  ) {
    const dateKey = date.toISOString().split("T")[0];
    const dayName = date.toLocaleDateString("en-us", { weekday: "long" });

    if (attendance[dateKey]) {
      // skip if already filled
      continue;
    }

    const subjects = schedule[dayName] || [];
    const blankAttendance = {};
    subjects.forEach((subject) => {
      blankAttendance[subject] = false;
    });

    if (subjects.length > 0) {
      attendance[dateKey] = blankAttendance;
    }
  }

  localStorage.setItem("attendance", JSON.stringify(attendance));
  alert("Backfill complete! Previous days added as 'not attended'.");
}
