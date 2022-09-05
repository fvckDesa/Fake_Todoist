import Icons from "../assets/icons";
import { getDueDateInfo, parseDueDateString } from "./due-date";
import { dueDatePickerWeekDayList } from "../dom/elements";
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";

export function createTaskProject({ name, color }) {
  const icon = document.createElement("svg-loader");
  icon.src = color ? Icons.Circle : Icons.Inbox;
  icon.style.color = color;

  const text = document.createElement("span");
  text.textContent = name;

  return [icon, text];
}

export function changeDueDateFormat() {
  for(const dueDateEl of [...document.querySelectorAll("[dueDate]")]) {
    const dueDateText = dueDateEl.querySelector("[dueDate-text]");

    const dueDate = parseDueDateString(dueDateEl.textContent);
    const { color, text } = getDueDateInfo(dueDate);

    dueDateEl.style.color = `var(${color})`;
    dueDateText.innerText = text;
  }
}

export function changeWeekStart() {
  dueDatePickerWeekDayList.replaceChildren(
    ...eachDayOfInterval({
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date())
    }).map(day => {
      const dayEl = document.createElement("div");
      dayEl.className = "week-day";
      dayEl.innerText = format(day, "EEEEE");

      return dayEl;
    })
  );
}