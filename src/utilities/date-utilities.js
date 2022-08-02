import {
  startOfWeek,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  getDayOfYear,
  getYear,
  addMonths,
  eachMonthOfInterval,
  parse,
  isMatch,
  startOfToday,
  nextSaturday,
  isWeekend,
  isBefore,
  addDays,
  nextMonday,
  isSameWeek,
  addYears,
  isThisYear,
  isYesterday,
  isThisWeek,
  isTomorrow,
  isToday,
  format
} from "date-fns";

export function getDaysInWeeksFormat(date) {
  return eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(endOfMonth(date)),
  }).map((day) => (isSameMonth(day, date) ? day : null));
}

export function isBeforeDay(day1, day2) {
  return (
    getDayOfYear(day1) < getDayOfYear(day2) && getYear(day1) === getYear(day2)
  );
}

export function getMonths(maxDate) {
  if(isSameMonth(addMonths(startOfToday(), 1), maxDate)) {
    maxDate = addMonths(maxDate, 4);
  }
  return [
    startOfToday(),
    ...eachMonthOfInterval({
      start: addMonths(startOfToday(), 1),
      end: maxDate,
    }),
  ];
}

export function parseDateString(dateString) {
  const patternList = [
    "d MMM",
    "d MMM yyyy",
    "d MMMM",
    "d MMMM yyyy",
    "EEE",
    "EEE d MMM",
    "EEE d MMM yyyy",
    "EEE d MMMM",
    "EEE d MMMM yyyy",
    "EEEE",
    "EEEE d MMM",
    "EEEE d MMM yyyy",
    "EEEE d MMMM",
    "EEEE d MMMM yyyy",
  ];
  // search date for pattern
  const formatString = patternList
    .reverse()
    .find((formatStr) => isMatch(dateString, formatStr));
  // get date object
  let date = formatString && parse(dateString, formatString, startOfToday());
    
  if(isBefore(date, startOfToday())) {
    if(formatString.match(/^E{3,4}$/)) date = addDays(date, 7);
    if(formatString.match(/d M{3,4}$/)) date = addYears(date, 1);
  }
  // search date for constants words
  switch (dateString.toLowerCase()) {
    case "today":
      date = startOfToday();
      break;
    case "tomorrow":
      date = addDays(startOfToday(), 1);
      break;
    case "this weekend":
      if (!isWeekend(startOfToday())) {
        date = nextSaturday(startOfToday());
      }
      break;
    case "next week":
      date = nextMonday(startOfToday());
      break;
  }

  return date;
}

export function isNextWeek(date) {
  return isSameWeek(date, nextMonday(startOfToday()));
}

export function isThisWeekend(date) {
  return isSameWeek(date, startOfToday()) && isWeekend(date);
}

export function getDueDateInfo(date) {
  let color = "", text = "";

  if(!date) {
    text = "Due Date";
  }
  if(date) {
    if(isBefore(date, startOfToday())) color = "--red";
    text = format(date, `d MMM${isThisYear(date) ? "" : " yyyy"}`);
  }
  if(date && isYesterday(date)) {
    color = "--red";
    text = "Yesterday";
  }
  if(date && isNextWeek(date)) {
    color = "--purple";
    text = format(date, "eeee");
  }
  if(date && isThisWeek(date) && isWeekend(date)) {
    color = "--blue"
    text = format(date, "eeee");
  }
  if(date && isTomorrow(date)) {
    color = "--orange";
    text = "Tomorrow";
  }
  if(date && isToday(date)) {
    color = "--green";
    text = "Today";
  }

  return { text, color };
}