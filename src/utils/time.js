import { isMatch, parse, getHours, getMinutes, set, format } from "date-fns";
import appSettings from "../settings";

const patternsTime = ["K:mm a", "h:mm a", "K a", "h a", "K:mm a", "h:mma", "Ka", "ha", "H:mm", "k:mm"];

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
  const time = date instanceof Date ? date : set(new Date(), date);
  return format(time, appSettings.timeFormat);
}

export function getTime(date) {
  return {
    hours: getHours(date),
    minutes: getMinutes(date),
  };
}