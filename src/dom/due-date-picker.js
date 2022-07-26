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
  dueDatePickerInput
} from "./elements";
import { getDaysInWeeksFormat, isBeforeDay } from "../module/date-utilities";
import {
  format,
  nextMonday,
  nextSaturday,
  isToday,
  isTomorrow,
  isWeekend,
  isSameDay,
  isThisYear,
  addDays,
  addMonths,
  startOfMonth,
} from "date-fns";

let datePick;

let maxDate = new Date();
let currentCalendar;

dueDatePickerContainer.addEventListener("click", () => {
  dueDatePickerContainer.classList.add("hidden");
});

dueDatePicker.addEventListener("click", (e) => {
  e.stopPropagation();
});

dueDatePickerSuggestionToday.addEventListener("click", () => {
  datePick = new Date();
  dueDatePickerContainer.classList.add("hidden");
});

dueDatePickerSuggestionTomorrow.addEventListener("click", () => {
  datePick = addDays(new Date(), 1);
  dueDatePickerContainer.classList.add("hidden");
});

dueDatePickerSuggestionThisWeekend.addEventListener("click", () => {
  datePick = nextSaturday(new Date());
  dueDatePickerContainer.classList.add("hidden");
});

dueDatePickerSuggestionNextWeek.addEventListener("click", () => {
  datePick = nextMonday(new Date());
  dueDatePickerContainer.classList.add("hidden");
});

dueDatePickerSuggestionNoDate.addEventListener("click", () => {
  datePick = null;
  dueDatePickerContainer.classList.add("hidden");
});

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
  const { 
    height: monthListHeight,
    top: monthListTop
  } = dueDatePickerMonthList.getBoundingClientRect();
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
  dueDatePickerHeaderMonth.innerText = currentCalendar.getAttribute("data-month");
  // disable and enable prev and next buttons
  dueDatePickerActionPrev.disabled = currentCalendar === dueDatePickerMonthList.firstElementChild;
  dueDatePickerActionCurr.disabled = monthListScroll === 0;
});

function activeDueDatePicker(el, dueDate = null) {
  // render due date picker
  dueDatePickerContainer.classList.remove("hidden");

  datePick = dueDate;
  // set date in input
  dueDatePickerInput.value = datePick 
    ? `${format(datePick, "d MMM")}${!isThisYear(datePick) ? " " + format(datePick, "yyyy") : "" }`
    : "";

  formatSuggestions();

  renderStartCalendarList();
}

activeDueDatePicker();

function scrollTo(calendar) {
  currentCalendar = calendar;
  const headerHeight = calendar.firstElementChild.getBoundingClientRect().height;
  dueDatePickerMonthList.scrollTo({
    top: calendar.offsetTop + headerHeight,
    behavior: "smooth",
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

function renderStartCalendarList() {
  // num of months to show in start date picker
  const START_MONTHS = 4;

  for (let i = 0; i < START_MONTHS; i++) {
    renderNewCalendar();
    if (i === 0) {
        currentCalendar = dueDatePickerMonthList.firstElementChild;
        maxDate = startOfMonth(maxDate);
    }
  }
  // set start month
  dueDatePickerHeaderMonth.innerText =
    dueDatePickerMonthList.firstChild.getAttribute("data-month");
}

function renderNewCalendar() {
  const calendar = createCalendar(maxDate);
  dueDatePickerMonthList.appendChild(calendar);
  maxDate = addMonths(maxDate, 1);
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
    const dayElement = document.createElement("div");
    dayElement.classList.add("date-picker-calendar-day");
    dayElement.setAttribute("data-date", day ? format(day, "yyyy-M-d") : "");
    if (isSameDay(day, datePick)) dayElement.classList.add("selected");

    const dayBg = document.createElement("div");
    dayBg.classList.add("date-picker-calendar-day-bg");
    dayBg.innerHTML = `<span>${numDay}</span>`;
    dayElement.appendChild(dayBg);
    // set extra info
    if (!day) {
      dayElement.classList.add("empty");
    }
    if (isBeforeDay(day, new Date())) {
      dayElement.classList.add("past");
    }
    if (isToday(day)) {
      dayElement.classList.add("today");
    }

    return dayElement;
  });
}

function getDatePick() {
  return datePick;
}

export { activeDueDatePicker, getDatePick };
