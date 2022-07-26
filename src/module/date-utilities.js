import {
  startOfWeek,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  getDayOfYear,
  getYear,
} from "date-fns";

export function getDaysInWeeksFormat(date, weekStartsOn = 0) {
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn }),
    end: endOfWeek(endOfMonth(date), { weekStartsOn }),
  }).map(day => isSameMonth(day, date) ? day : null);
}

export function isBeforeDay(day1, day2) {
  return (
    getDayOfYear(day1) < getDayOfYear(day2) && getYear(day1) === getYear(day2)
  );
}
