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
  dueDatePickerMonthListHeader,
  dueDatePickerMonthList,
  dueDatePickerInput,
  dueDatePickerPreview,
  dueDatePickerPreviewDate,
  pickerCrossIcon,
  dueDatePickerTaskCounter
} from "./elements";
import {
  getDaysInWeeksFormat,
  isBeforeDay,
  getMonths,
  parseDateString,
  isThisWeekend,
  isNextWeek
} from "../module/date-utilities";
import {
  format,
  nextMonday,
  nextSaturday,
  isToday,
  isTomorrow,
  isSameDay,
  isThisYear,
  addDays,
  addMonths,
  startOfMonth,
  startOfToday,
  parse
} from "date-fns";
import todoList from "../module/todo-list";

let datePick;
let submitCb;
let element;

let maxDate = startOfToday();
let currentCalendar;
let isScroll = false;

dueDatePickerContainer.addEventListener("click", () => {
  dueDatePickerContainer.classList.add("hidden");
  dueDatePickerPreview.hidden = true;
});

dueDatePicker.addEventListener("click", (e) => {
  e.stopPropagation();
});

dueDatePicker.addEventListener("submit", (e) => {
  e.preventDefault();

  submitCb(datePick);

  dueDatePickerContainer.classList.add("hidden");
  dueDatePickerPreview.hidden = true;
});

dueDatePickerInput.addEventListener("input", () => {
  const value = dueDatePickerInput.value.trim();
  const date = parseDateString(value);
  
  dueDatePickerPreview.hidden = date == undefined;
  positionDueDatePicker(element);
  if(!date) return;
  dueDatePickerPreview.setAttribute("data-date", format(date, "yyyy-MM-dd"));
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
  positionDueDatePicker(element);
});

dueDatePickerPreview.addEventListener("click", () => {
  setDatePick(parse(dueDatePickerPreview.getAttribute("data-date"), "yyyy-MM-dd", startOfToday()));
});

dueDatePickerSuggestionToday.addEventListener("click", () =>
  setDatePick(startOfToday())
);

dueDatePickerSuggestionTomorrow.addEventListener("click", () =>
  setDatePick(addDays(startOfToday(), 1))
);

dueDatePickerSuggestionThisWeekend.addEventListener("click", () =>
  setDatePick(nextSaturday(startOfToday()))
);

dueDatePickerSuggestionNextWeek.addEventListener("click", () =>
  setDatePick(nextMonday(startOfToday()))
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
  // active border on month list header
  dueDatePickerMonthListHeader.classList.toggle("border", monthListScroll > 0);
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
// detect scroll end
let timeout;
dueDatePickerMonthList.addEventListener("scroll", () => {
  isScroll = true;
  clearTimeout(timeout);
  timeout = setTimeout(() => { isScroll = false; }, 100);
});

function activeDueDatePicker(el, next = () => {}, dueDate = null) {
  // render due date picker
  dueDatePickerContainer.classList.remove("hidden");
  // set states
  datePick = dueDate;
  submitCb = next;
  element = el;
  // set date in input
  dueDatePickerInput.value = datePick
    ? `${format(datePick, "d MMM")}${
        !isThisYear(datePick) ? " " + format(datePick, "yyyy") : ""
      }`
    : "";

  formatSuggestions();

  renderStartCalendarList(dueDate);

  positionDueDatePicker(el);
}

function scrollTo(calendar) {
  currentCalendar = calendar;
  dueDatePickerMonthList.scrollTo({
    top: calendar.lastElementChild.offsetTop,
    behavior: "smooth",
  });
}

function formatSuggestions() {
  // set suggestions days text
  dueDatePickerSuggestionToday.lastChild.innerText = format(startOfToday(), "EEE");
  dueDatePickerSuggestionTomorrow.lastChild.innerText = format(
    addDays(startOfToday(), 1),
    "EEE"
  );
  dueDatePickerSuggestionNextWeek.lastChild.innerText = format(
    nextMonday(startOfToday()),
    "EEE d MMM"
  );
  // remove suggestions if date is set
  dueDatePickerSuggestionToday.hidden = datePick && isToday(datePick);
  dueDatePickerSuggestionTomorrow.hidden = datePick && isTomorrow(datePick);
  dueDatePickerSuggestionThisWeekend.hidden = datePick && isThisWeekend(datePick);
  dueDatePickerSuggestionNextWeek.hidden = datePick && isNextWeek(datePick);
  dueDatePickerSuggestionNoDate.hidden = datePick === null;
}

function renderStartCalendarList(maxDatePar) {
  maxDate = addMonths(maxDatePar ?? addMonths(startOfToday(), 4), 1);
  maxDate = startOfMonth(maxDate);

  dueDatePickerMonthList.replaceChildren(...getMonths(maxDate).map(createCalendar));

  scrollTo([...dueDatePickerMonthList.children].find((calendar) => {
    return format(maxDatePar ?? startOfToday(), "MMM yyyy") === calendar.getAttribute("data-month");
  }));
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
    if (isBeforeDay(day, startOfToday())) {
      dayElement.classList.add("past");
      dayElement.disabled = true;
    }
    if (isToday(day)) {
      dayElement.classList.add("today");
    }

    dayElement.addEventListener("click", () => setDatePick(day));

    if(!dayElement.classList.contains("empty") && !dayElement.classList.contains("past")) {
      const taskInThisDay = todoList.getTaskFromDate(day);

      dayElement.addEventListener("mouseover", () => {
        if(isScroll) return;
        const [ counterInfo, counterBar ] = dueDatePickerTaskCounter.children;
        // date
        counterInfo.firstElementChild.innerText = format(day, `eee d MMM ${isThisYear(day) ? "" : "yyyy"}`);
        // num tasks
        counterInfo.lastElementChild.innerText = `${taskInThisDay.length} tasks due`;
        
        counterBar.replaceChildren(...taskInThisDay.map(() => document.createElement("span")));

        dueDatePickerTaskCounter.classList.remove("hidden");
      });
      dayElement.addEventListener("mouseleave", () => {
        dueDatePickerTaskCounter.classList.add("hidden");
      });

      if(taskInThisDay.length > 0) dayElement.classList.add("has-task");
    }

    return dayElement;
  });
}

function positionDueDatePicker(el) {
  let coords = { x: 0, y: 0 }; 
  // get info of element
  const { left, right, top, bottom, width, height } = el.getBoundingClientRect();
  // get dimensions of body
  const { height: bodyHeight, width: bodyWidth } = document.body.getBoundingClientRect();
  // get dimensions of dueDatePicker
  const { height: dueDatePickerHeight, width: dueDatePickerWidth } = dueDatePicker.getBoundingClientRect();
  // resize x and y if overflow in body
  const PADDING = 20;
  const overflowXCorrector = (x) => {
    return Math.min(Math.max(x, PADDING), bodyWidth - dueDatePickerWidth - PADDING);
  }
  const overflowYCorrector = (y) => {
    return Math.min(Math.max(y, PADDING), bodyHeight - dueDatePickerHeight - PADDING);
  }
  // get x and y coordinates
  // from top
  if(top - dueDatePickerHeight > 0) {
    coords = {
      x: overflowXCorrector(left - dueDatePickerWidth / 2 + width / 2),
      y: overflowYCorrector(top - dueDatePickerHeight),
    }
  // from bottom
  } else if(bottom + dueDatePickerHeight < bodyHeight) {
    coords = {
      x: overflowXCorrector(left - dueDatePickerWidth / 2 + width / 2),
      y: overflowYCorrector(bottom),
    }
  // from left
  } else if(left - dueDatePickerWidth > 0) {
    coords = {
      x: overflowXCorrector(left - dueDatePickerWidth),
      y: overflowYCorrector(top - dueDatePickerHeight / 2 + height / 2),
    }
  // from right
  } else if(right + dueDatePickerWidth < bodyWidth) {
    coords = {
      x: overflowXCorrector(right),
      y: overflowYCorrector(top - dueDatePickerHeight / 2 + height / 2),
    }
  }

  const { x, y } = coords;
  dueDatePicker.style.cssText = `transform: translate(${x}px, ${y}px)`;
}

function setDatePick(date) {
  datePick = date;
}

function getDatePick() {
  return datePick;
}

export { activeDueDatePicker, getDatePick };
