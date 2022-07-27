import {
  dueDatePickerContainer,
  dueDatePicker,
  dueDatePickerSuggestionToday,
  dueDatePickerSuggestionTomorrow,
  dueDatePickerSuggestionThisWeekend,
  dueDatePickerSuggestionNextWeek,
  dueDatePickerSuggestionNoDate,
  dueDatePickerHeaderMonth,
  dueDatePickerActionPrev,
  dueDatePickerActionCurr,
  dueDatePickerActionNext,
  dueDatePickerWeekDayList,
  dueDatePickerMonthList,
  dueDatePickerInput,
  dueDatePickerPreview,
  dueDatePickerPreviewDate,
  pickerCrossIcon
} from "./elements";
import { getDaysInWeeksFormat, isBeforeDay, getMonths, parseDateString } from "../module/date-utilities";
import {
  format,
  nextMonday,
  nextSaturday,
  isToday,
  isTomorrow,
  isWeekend,
  isSameDay,
  isThisYear,
  isBefore,
  addDays,
  addMonths,
  startOfToday,
  startOfMonth,
  isMatch,
  parse,
} from "date-fns";

let datePick;
let submitCb;

let maxDate = new Date();
let currentCalendar;

dueDatePickerContainer.addEventListener("click", () => {
  dueDatePickerContainer.classList.add("hidden");
});

dueDatePicker.addEventListener("click", (e) => {
  e.stopPropagation();
});

dueDatePicker.addEventListener("submit", (e) => {
  e.preventDefault();

  submitCb(datePick);

  dueDatePickerContainer.classList.add("hidden");
});

dueDatePickerInput.addEventListener("input", () => {
  const value = dueDatePickerInput.value.trim();
  const date = parseDateString(value);
  
  dueDatePickerPreview.hidden = date == undefined;
  if(!date) return;
  // set info
  dueDatePickerPreviewDate
    .firstElementChild
    .innerText = format(date, `eee d MMM ${isThisYear(date) ? "" : "yyyy"}`);

  const numTasks = 0;
  dueDatePickerPreviewDate.lastElementChild.innerText = numTasks > 0
    ? `${numTasks} task${numTasks > 1 ? "s" : ""}`
    : "No tasks";
});

dueDatePickerInput.addEventListener("input", () => {
  pickerCrossIcon.hidden = dueDatePickerInput.value.trim().length === 0;
});

pickerCrossIcon.addEventListener("click", () => {
  dueDatePickerInput.value = "";
  pickerCrossIcon.hidden = true;
  dueDatePickerPreview.hidden = true;
});

dueDatePickerSuggestionToday.addEventListener("click", () =>
  setDatePick(new Date())
);

dueDatePickerSuggestionTomorrow.addEventListener("click", () =>
  setDatePick(addDays(new Date(), 1))
);

dueDatePickerSuggestionThisWeekend.addEventListener("click", () =>
  setDatePick(nextSaturday(new Date()))
);

dueDatePickerSuggestionNextWeek.addEventListener("click", () =>
  setDatePick(nextMonday(new Date()))
);

dueDatePickerSuggestionNoDate.addEventListener("click", () =>
  setDatePick(null)
);

dueDatePickerActionPrev.addEventListener("click", () =>
  scrollTo(currentCalendar.previousElementSibling)
);

dueDatePickerActionCurr.addEventListener("click", () =>
  scrollTo(dueDatePickerMonthList.firstElementChild)
);

dueDatePickerActionNext.addEventListener("click", () =>
  scrollTo(currentCalendar.nextElementSibling)
);

dueDatePickerMonthList.addEventListener("scroll", () => {
  const { height: monthListHeight, top: monthListTop } =
    dueDatePickerMonthList.getBoundingClientRect();
  const monthListScroll = dueDatePickerMonthList.scrollTop;
  // active border on week day list
  dueDatePickerWeekDayList.classList.toggle("border", monthListScroll > 0);
  // add months
  if (monthListScroll > monthListHeight / 2) {
    renderNewCalendar();
  }
  // change current month
  currentCalendar = [...dueDatePickerMonthList.children].find((calendar) => {
    const { bottom: calendarBottom } = calendar.getBoundingClientRect();
    return calendarBottom >= monthListTop;
  });
  dueDatePickerHeaderMonth.innerText =
    currentCalendar.getAttribute("data-month");
  // disable and enable prev and next buttons
  dueDatePickerActionPrev.disabled =
    currentCalendar === dueDatePickerMonthList.firstElementChild;
  dueDatePickerActionCurr.disabled = monthListScroll === 0;
});

function activeDueDatePicker(el, next = () => {}, dueDate = null) {
  // render due date picker
  dueDatePickerContainer.classList.remove("hidden");
  // set params
  datePick = dueDate;
  submitCb = next;
  // set date in input
  dueDatePickerInput.value = datePick
    ? `${format(datePick, "d MMM")}${
        !isThisYear(datePick) ? " " + format(datePick, "yyyy") : ""
      }`
    : "";

  formatSuggestions();

  renderStartCalendarList(dueDate);
}

function scrollTo(calendar) {
  currentCalendar = calendar;
  const headerHeight = calendar.firstElementChild.getBoundingClientRect().height;
  console.log(calendar.offsetTop + headerHeight)
  dueDatePickerMonthList.scrollTo({
    top: Math.floor(calendar.offsetTop + headerHeight),
    /* behavior: "smooth", */
  });
}

function formatSuggestions() {
  // set suggestions days text
  dueDatePickerSuggestionToday.lastChild.innerText = format(new Date(), "EEE");
  dueDatePickerSuggestionTomorrow.lastChild.innerText = format(
    addDays(new Date(), 1),
    "EEE"
  );
  dueDatePickerSuggestionNextWeek.lastChild.innerText = format(
    nextMonday(new Date()),
    "EEE d MMM"
  );
  // remove suggestions if date is set
  dueDatePickerSuggestionToday.hidden = datePick && isToday(datePick);
  dueDatePickerSuggestionTomorrow.hidden = datePick && isTomorrow(datePick);
  dueDatePickerSuggestionThisWeekend.hidden = datePick && isWeekend(datePick);
  dueDatePickerSuggestionNoDate.hidden = datePick === null;
}

function renderStartCalendarList(maxDatePar) {
  maxDate = addMonths(maxDatePar ?? addMonths(new Date(), 4), 1);

  dueDatePickerMonthList.replaceChildren(...getMonths(maxDate).map(createCalendar));
  
  maxDate = startOfMonth(maxDate);

  if(maxDatePar) scrollTo(dueDatePickerMonthList.children[dueDatePickerMonthList.children.length - 2]);
}

function renderNewCalendar() {
  maxDate = addMonths(maxDate, 1);
  const calendar = createCalendar(maxDate);
  dueDatePickerMonthList.appendChild(calendar);
}

function createCalendar(date) {
  const MONDAY = 1;
  // create calendar
  const calendar = document.createElement("div");
  calendar.classList.add("date-picker-calendar");
  calendar.setAttribute("data-month", format(date, "MMM yyyy"));
  // create header of calendar
  const header = document.createElement("header");
  header.classList.add("date-picker-calendar-header");
  header.innerText = format(date, "MMM");
  calendar.appendChild(header);
  // create grid of days
  const grid = document.createElement("div");
  grid.classList.add("date-picker-calendar-grid");
  grid.append(...createDaysElements(getDaysInWeeksFormat(date, MONDAY)));
  calendar.appendChild(grid);

  return calendar;
}

function createDaysElements(days) {
  return days.map((day) => {
    // num day of element
    const numDay = day ? format(day, "d") : "";
    // create element
    const dayElement = document.createElement("button");
    dayElement.classList.add("date-picker-calendar-day");
    if (isSameDay(day, datePick)) dayElement.classList.add("selected");

    const dayBg = document.createElement("div");
    dayBg.classList.add("date-picker-calendar-day-bg");
    dayBg.innerHTML = `<span>${numDay}</span>`;
    dayElement.appendChild(dayBg);
    // set extra info
    if (!day) {
      dayElement.classList.add("empty");
      dayElement.disabled = true;
    }
    if (isBeforeDay(day, new Date())) {
      dayElement.classList.add("past");
      dayElement.disabled = true;
    }
    if (isToday(day)) {
      dayElement.classList.add("today");
    }

    dayElement.addEventListener("click", () => setDatePick(day));

    return dayElement;
  });
}

function setDatePick(date) {
  datePick = date;
}

function getDatePick() {
  return datePick;
}

export { activeDueDatePicker, getDatePick };
