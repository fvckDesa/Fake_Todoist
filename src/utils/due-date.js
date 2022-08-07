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
  isWeekend,
  isBefore,
  addDays,
  nextMonday,
  isSameWeek,
  isThisYear,
  isYesterday,
  isThisWeek,
  isTomorrow,
  isToday,
  format,
  isWithinInterval,
  isEqual,
  endOfDay,
  endOfToday,
  set,
  isPast,
  isSameDay,
} from "date-fns";
import { checkTimeValidity, parseTime } from "./time";

const patternsDate = [
  "EEEE d MMMM yyyy",
  "EEEE d MMMM",
  "EEEE d MMM yyyy",
  "EEEE d MMM",
  "EEEE",
  "EEE d MMMM yyyy",
  "EEE d MMMM",
  "EEE d MMM yyyy",
  "EEE d MMM",
  "EEE",
  "d MMMM yyyy",
  "d MMMM",
  "d MMM yyyy",
  "d MMM",
];

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
  if (isSameMonth(addMonths(endOfToday(), 1), maxDate)) {
    maxDate = addMonths(maxDate, 4);
  }
  return [
    endOfToday(),
    ...eachMonthOfInterval({
      start: addMonths(endOfToday(), 1),
      end: maxDate,
    }),
  ];
}

export function parseDueDateString(dueDateStr) {
  const timeRegex =
    /[0-9]{1,2}((:[0-9]{2} (am|AM|pm|PM))|(:[0-9]{2})|( ?(am|AM|pm|PM))){1}/;
  // get time from dueDateStr
  const timeStr = dueDateStr.match(timeRegex)?.[0];

  if (timeStr && !checkTimeValidity(timeStr)) return null;

  const time = timeStr ? parseTime(timeStr) : {};
  // get date from dueDateStr and return dueDate
  const dateStr = dueDateStr.replace(timeRegex, "").trim();
  
  switch (dateStr.toLowerCase()) {
    // only time return next useful occurrence of time
    case "":
      if (Object.keys(time).length === 2) {
        const date = set(endOfToday(), time);
        return isPast(date) ? addDays(date, 1) : date;
      }
      return null;
    case "today":
      return set(endOfToday(), time);
    case "tomorrow":
      return set(addDays(endOfToday(), 1), time);
    case "next week":
      return set(nextMonday(endOfToday()), time);
    // else return date if it's valid pattern
    default:
      const pattern = patternsDate.find((formatStr) =>
        isMatch(dateStr, formatStr)
      );

      if (!pattern) return null;
      
      let date = endOfDay(parse(dateStr, pattern, endOfToday()));
      // set next useful occurrence of week day
      if(
        (pattern === "EEEE" || pattern === "EEE") &&
        isBeforeDay(date, new Date())
      ) date = addDays(date, 7);

      return set(date, time);
  }
}

export function isThisWeekend(date) {
  return isSameWeek(date, startOfToday()) && isWeekend(date);
}

export function getDueDateInfo(date) {
  let color = "",
    text = "";

  if (!date) {
    text = "Due Date";
  }
  if (date) {
    text = formatDateString(date);
  }
  if (
    date &&
    isWithinInterval(date, {
      start: startOfToday(),
      end: addDays(endOfToday(), 7),
    })
  ) {
    color = "--purple";
    text = format(date, "eeee");
  }
  if (date && isThisWeek(date) && isWeekend(date)) {
    color = "--blue";
    text = format(date, "eeee");
  }
  if (date && isTomorrow(date)) {
    color = "--orange";
    text = "Tomorrow";
  }
  if (date && isToday(date)) {
    color = "--green";
    text = "Today";
  }
  if (date && isBefore(date, new Date())) {
    color = "--red";
    text = isYesterday(date) ? "Yesterday" : formatDateString(date);
    text = isToday(date) ? "Today" : text;
  }

  if (date && !isEndOfDay(date)) text = `${text} ${format(date, "HH:mm")}`;

  return { text, color };
}

export function isEndOfDay(date) {
  return isEqual(date, endOfDay(date));
}

export function formatDateString(date) {
  return format(date, `d MMM${isThisYear(date) ? "" : " yyyy"}`);
}
