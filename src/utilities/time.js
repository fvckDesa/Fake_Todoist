import { isMatch, parse, getHours, getMinutes } from "date-fns";
import { patternsTime } from "./constants";

export function parseTime(time) {
  if (!checkTimeValidity(time)) {
    throw new Error(`Invalid time format: ${time}`);
  }

  const formatString = patternsTime.find((formatString) =>
    isMatch(time, formatString)
  );

  const date = parse(time, formatString, new Date());

  return getTime(date);
}

export function checkTimeValidity(time) {
  return patternsTime.some((formatString) => isMatch(time, formatString));
}

export function formatTimeString(date) {
  const time = date instanceof Date ? getTime(date) : date;
  const { hours, minutes } = time;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function getTime(date) {
  return {
    hours: getHours(date),
    minutes: getMinutes(date),
  };
}