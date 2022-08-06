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
  format,
  isWithinInterval,
  isEqual,
  endOfDay,
  endOfToday,
  set,
} from "date-fns";
import { patternsDueDate } from "./constants";
import { getTime } from "./time";

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

export function parseDueDateString(dateString) {
  // search date for pattern
  const pattern = patternsDueDate.find((formatStr) => isMatch(dateString, formatStr));

  if(!pattern) return null;
  // get date object
  const date = parse(dateString, pattern, endOfToday());

  const timePattern = pattern.replace(/[^kKhHa: m]/g, "").trim();
  const str = timePattern ? format(date, timePattern).toLowerCase() : "";
  const time = str && dateString.toLowerCase().includes(str) ? getTime(date) : {};

  return set(endOfDay(date), time);

  /* 
  const timeRegex = /[0-9]{1,2}((:[0-9]{2} (am|AM|pm|PM))|(:[0-9]{2})|( (am|AM|pm|PM))){1}/;
  */
}

export function isNextWeek(date) {
  return isSameWeek(date, nextMonday(startOfToday()));
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
