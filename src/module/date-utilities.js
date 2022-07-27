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
} from "date-fns";

export function getDaysInWeeksFormat(date, weekStartsOn = 0) {
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn }),
    end: endOfWeek(endOfMonth(date), { weekStartsOn }),
  }).map((day) => (isSameMonth(day, date) ? day : null));
}

export function isBeforeDay(day1, day2) {
  return (
    getDayOfYear(day1) < getDayOfYear(day2) && getYear(day1) === getYear(day2)
  );
}

export function getMonths(maxDate = addMonths(new Date(), 4)) {
  return [
    new Date(),
    ...eachMonthOfInterval({
      start: addMonths(new Date(), 1),
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
  let date = formatString && parse(dateString, formatString, new Date());
  // add 1 week if day of week is in past
  if (
    isBefore(date, startOfToday()) &&
    (formatString === "EEE" || formatString === "EEEE")
  )
    date = addDays(date, 7);
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
