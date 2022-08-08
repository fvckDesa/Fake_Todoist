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
  nextSaturday,
  endOfYesterday,
  addYears,
} from "date-fns";
import { checkTimeValidity, parseTime } from "./time";

const patternsDate = [
  "EEEE d MMMM yyyy",
  "EEEE d MMMM",
  "EEEE d/M/yyyy",
  "EEEE d/M",
  "EEEE d-M-yyyy",
  "EEEE d-M",
  "EEEE",
  "d MMMM yyyy",
  "d MMMM",
  "d/M/yyyy",
  "d/M",
  "d-M-yyyy",
  "d-M"
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


  // only time return next useful occurrence of time
  if (dateStr.length === 0) {
    if (Object.keys(time).length !== 2) return null;

    const dueDate = set(endOfToday(), time);
    return isPast(dueDate) ? addDays(dueDate, 1) : dueDate;
  }

  let date;

  switch (dateStr.toLowerCase()) {
    case "today":
      date = endOfToday();
      break;
    case "tomorrow":
      date = addDays(endOfToday(), 1);
      break;
    case "next week":
      date = nextMonday(endOfToday());
      break;
    case "this weekend":
      date = nextSaturday(endOfToday());
      break;
    case "next weekend":
      date = nextSaturday(nextSaturday(endOfToday()));
      break;
    case "yesterday":
      date = endOfYesterday();
      break;
    case "next month":
      date = addMonths(endOfToday(), 1);
      break;
    case "next year":
      date = addYears(endOfToday(), 1);
      break;
    // else return date if it's valid pattern
    default:
      date = parseDateString(dateStr);

      if(!date) return null;
      // set next useful occurrence of week day
      if (
        (pattern === "EEEE" || pattern === "EEE") &&
        isBeforeDay(date, new Date())
      ) date = addDays(date, 7);

      break;
  }
  return set(date, time);
}

function parseDateString(dateStr) {
  const pattern = patternsDate.find((formatStr) =>
    isMatch(dateStr, formatStr)
  );

  if (!pattern) return null;

  return endOfDay(parse(dateStr, pattern, endOfToday()));
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
