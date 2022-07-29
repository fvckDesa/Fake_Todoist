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

export function getMonths(maxDate) {
  if(isSameMonth(addMonths(new Date(), 1), maxDate)) {
    maxDate = addMonths(maxDate, 4);
  }
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
  return isSameWeek(date, nextMonday(startOfToday()), { weekStartsOn: 1 });
}

export function isThisWeekend(date) {
  return isSameWeek(date, startOfToday(), { weekStartsOn: 1 }) && isWeekend(date);
}