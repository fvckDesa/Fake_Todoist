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
  dueDatePickerTaskCounter,
  dueDatePickerActions,
  dueDatePickerAddTime,
  dueDatePickerSave,
} from "./elements";
import {
  getDaysInWeeksFormat,
  isBeforeDay,
  getMonths,
  parseDueDateString,
  isThisWeekend,
  isNextWeek,
  isEndOfDay,
  formatDateString,
  nextWeek,
  nextWeekend,
} from "../utils/due-date";
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
  endOfDay,
  parse,
  set,
  endOfToday,
  isEqual,
  endOfTomorrow,
} from "date-fns";
import todoList from "../module/todo-list";
import activeTimePicker from "./time-picker";
import Icons from "../assets/icons";
import { formatTimeString, getTime } from "../utils/time";

let dueDatePick;
let submitCb;
let resetCb;
let element;

let startDueDate;

let maxDate = endOfToday();
let currentCalendar;
let isScroll = false;

window.addEventListener("resize", () => {
  if (dueDatePickerContainer.classList.contains("hidden")) return;
  positionDueDatePicker(element);
});

dueDatePickerContainer.addEventListener("click", () => {
  dueDatePickerContainer.classList.add("hidden");
  dueDatePickerPreview.hidden = true;

  resetCb();
});

dueDatePicker.addEventListener("click", (e) => {
  e.stopPropagation();
});

dueDatePicker.addEventListener("submit", (e) => {
  e.preventDefault();

  submitCb(dueDatePick);

  dueDatePickerContainer.classList.add("hidden");
  dueDatePickerPreview.hidden = true;
});

dueDatePickerInput.addEventListener("input", () => {
  const value = dueDatePickerInput.value.trim();
  const date = parseDueDateString(value);

  dueDatePickerPreview.hidden = date == null;
  positionDueDatePicker(element);
  if (!date) return;
  dueDatePickerPreview.setAttribute("data-dueDate", value);
  // set info
  const [previewDay, previewTime] =
    dueDatePickerPreviewDate.firstElementChild.children;
  previewDay.innerText = formatDateString(date, "eee");
  
  previewTime.innerText = !isEndOfDay(date)
    ? formatTimeString(date)
    : "";

  const numTasks = todoList.getTaskFromDate(date).length;
  dueDatePickerPreviewDate.lastElementChild.innerText =
    numTasks > 0 ? `${numTasks} task${numTasks > 1 ? "s" : ""}` : "No tasks";
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
  dueDatePick = parseDueDateString(dueDatePickerPreview.getAttribute("data-dueDate"));
});

dueDatePickerSuggestionToday.addEventListener("click", () =>
  setDatePick(endOfToday())
);

dueDatePickerSuggestionTomorrow.addEventListener("click", () =>
  setDatePick(addDays(endOfToday(), 1))
);

dueDatePickerSuggestionThisWeekend.addEventListener("click", () =>
  setDatePick(nextWeekend())
);

dueDatePickerSuggestionNextWeek.addEventListener("click", () =>
  setDatePick(nextWeek())
);

dueDatePickerSuggestionNoDate.addEventListener("click", () => {
  setDatePick(null);
  setTimePick(null);
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
  timeout = setTimeout(() => {
    isScroll = false;
  }, 100);
});

dueDatePickerAddTime.addEventListener("click", () => {
  activeTimePicker(dueDatePickerAddTime, null, setTimePick);
});

function activeDueDatePicker(el, dueDate = null, next = () => {}, close = () => {}) {
  // render due date picker
  dueDatePickerContainer.classList.remove("hidden");
  // set states
  dueDatePick = dueDate;
  startDueDate = dueDate ? new Date(dueDate) : null;
  submitCb = next;
  resetCb = close;
  element = el;
  // set date in input
  setDueDateInInput(dueDatePick);

  formatSuggestions();

  renderStartCalendarList(dueDate);

  positionDueDatePicker(el);

  setTimePick(dueDate && !isEndOfDay(dueDate) ? getTime(dueDate) : null);
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
  dueDatePickerSuggestionToday.lastChild.innerText = format(
    endOfToday(),
    "EEE"
  );
  dueDatePickerSuggestionTomorrow.lastChild.innerText = format(
    addDays(endOfToday(), 1),
    "EEE"
  );
  dueDatePickerSuggestionNextWeek.lastChild.innerText = formatDateString(
    nextWeek(),
    "EEE"
  );
  const thisWeekend = isThisWeekend(endOfToday());
  dueDatePickerSuggestionThisWeekend.children[1].innerText = thisWeekend
    ? "Next weekend"
    : "This weekend";
  dueDatePickerSuggestionThisWeekend.lastChild.innerText = thisWeekend
    ? formatDateString(nextWeekend(), "EEE")
    : format(nextWeekend(), "EEE");
  // remove suggestions if date is set
  dueDatePickerSuggestionToday.hidden = dueDatePick && isToday(dueDatePick);
  dueDatePickerSuggestionTomorrow.hidden = dueDatePick && isTomorrow(dueDatePick);
  dueDatePickerSuggestionNextWeek.hidden = isEqual(nextWeek(), endOfTomorrow());
  dueDatePickerSuggestionNoDate.hidden = dueDatePick === null;
}

function renderStartCalendarList(maxDatePar) {
  maxDate = addMonths(maxDatePar ?? addMonths(endOfToday(), 4), 1);
  maxDate = startOfMonth(maxDate);

  dueDatePickerMonthList.replaceChildren(
    ...getMonths(maxDate).map(createCalendar)
  );

  scrollTo(
    [...dueDatePickerMonthList.children].find((calendar) => {
      return (
        format(maxDatePar ?? endOfToday(), "MMM yyyy") ===
        calendar.getAttribute("data-month")
      );
    })
  );
}

function renderNewCalendar() {
  maxDate = addMonths(maxDate, 1);
  const calendar = createCalendar(maxDate);
  dueDatePickerMonthList.appendChild(calendar);
}

function createCalendar(date) {
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
  grid.append(...createDaysElements(getDaysInWeeksFormat(date)));
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

    const dayBg = document.createElement("div");
    dayBg.classList.add("date-picker-calendar-day-bg");
    dayBg.innerHTML = `<span>${numDay}</span>`;
    dayElement.appendChild(dayBg);
    // set extra info
    if (!day) {
      dayElement.classList.add("empty");
      dayElement.disabled = true;
    }
    if (isBeforeDay(day, endOfToday())) {
      dayElement.classList.add("past");
      dayElement.disabled = true;
    }
    if (isToday(day)) {
      dayElement.classList.add("today");
    }
    if (isSameDay(day, dueDatePick) && !dayElement.classList.contains("past")) {
      dayElement.classList.add("selected");
    }

    dayElement.addEventListener("click", () => {
      dayElement.type = dueDatePick && !isEndOfDay(dueDatePick) ? "button" : "submit";

      setDatePick(day);

      changeDaySelected(dayElement);
    });

    if (
      !dayElement.classList.contains("empty") &&
      !dayElement.classList.contains("past")
    ) {
      const taskInThisDay = todoList.getTaskFromDate(day);

      dayElement.addEventListener("mouseover", () => {
        if (isScroll) return;
        const [counterInfo, counterBar] = dueDatePickerTaskCounter.children;
        // date
        counterInfo.firstElementChild.innerText = formatDateString(day, "eee");
        // num tasks
        counterInfo.lastElementChild.innerText = `${taskInThisDay.length} tasks due`;

        counterBar.replaceChildren(
          ...taskInThisDay.map(() => document.createElement("span"))
        );

        dueDatePickerTaskCounter.classList.remove("hidden");
      });
      dayElement.addEventListener("mouseleave", () => {
        dueDatePickerTaskCounter.classList.add("hidden");
      });

      if (taskInThisDay.length > 0) dayElement.classList.add("has-task");
    }

    return dayElement;
  });
}

function positionDueDatePicker(el) {
  let coords = null;
  // get info of element
  const { left, right, top, bottom, width, height } =
    el.getBoundingClientRect();
  // get dimensions of body
  const { height: bodyHeight, width: bodyWidth } =
    document.body.getBoundingClientRect();
  // get dimensions of dueDatePicker
  const { height: dueDatePickerHeight, width: dueDatePickerWidth } =
    dueDatePicker.getBoundingClientRect();
  // resize x and y if overflow in body
  const PADDING = 20;
  const overflowXCorrector = (x) => {
    return Math.min(
      Math.max(x, PADDING),
      bodyWidth - dueDatePickerWidth - PADDING
    );
  };
  const overflowYCorrector = (y) => {
    return Math.min(
      Math.max(y, PADDING),
      bodyHeight - dueDatePickerHeight - PADDING
    );
  };
  // get x and y coordinates
  // from top
  if (top - dueDatePickerHeight > 0) {
    coords = {
      x: overflowXCorrector(left - dueDatePickerWidth / 2 + width / 2),
      y: overflowYCorrector(top - dueDatePickerHeight),
    };
    // from bottom
  } else if (bottom + dueDatePickerHeight + PADDING < bodyHeight) {
    coords = {
      x: overflowXCorrector(left - dueDatePickerWidth / 2 + width / 2),
      y: overflowYCorrector(bottom),
    };
    // from left
  } else if (left - dueDatePickerWidth > 0) {
    coords = {
      x: overflowXCorrector(left - dueDatePickerWidth),
      y: overflowYCorrector(top - dueDatePickerHeight / 2 + height / 2),
    };
    // from right
  } else if (right + dueDatePickerWidth < bodyWidth) {
    coords = {
      x: overflowXCorrector(right),
      y: overflowYCorrector(top - dueDatePickerHeight / 2 + height / 2),
    };
  }

  dueDatePicker.style.cssText = coords
    ? `transform: translate(${coords.x}px, ${coords.y}px)`
    : ` top: 50%; left: 50%; transform: translate(-50%, -50%);`;
}

function setTimePick(time) {
  dueDatePick = time
    ? set(dueDatePick ?? endOfToday(), time)
    : dueDatePick
    ? endOfDay(dueDatePick)
    : null;

  setDueDateInInput(dueDatePick);

  dueDatePickerActions.firstElementChild.replaceWith(
    time ? createTimeElement(time) : dueDatePickerAddTime
  );
  // render save btn
  dueDatePickerSave.hidden = JSON.stringify(startDueDate) === JSON.stringify(dueDatePick);
}

function createTimeElement(time) {
  const timeEl = document.createElement("span");
  timeEl.classList.add("date-actions-time");

  timeEl.innerHTML = `
    <span class="date-actions-time-label">${formatTimeString(time)}</span>
    <span class="date-actions-time-remove">
      <svg-loader src="${Icons.CloseXs}"></svg-loader>
    </span>
  `;

  timeEl.firstElementChild.addEventListener("click", () =>
    activeTimePicker(
      timeEl.firstElementChild,
      dueDatePick && !isEndOfDay(dueDatePick) ? getTime(dueDatePick) : null,
      setTimePick
    )
  );

  timeEl.lastElementChild.addEventListener("click", () => setTimePick(null));

  return timeEl;
}

function setDueDateInInput(dueDate) {
  if(!dueDate) {
    dueDatePickerInput.value = "";
    return;
  }
  dueDatePickerInput.value = formatDateString(dueDate);

  if(!isEndOfDay(dueDate)) dueDatePickerInput.value += ` ${formatTimeString(dueDate)}`;
}

function changeDaySelected(dayEl) {
  dueDatePicker.querySelector(".selected")?.classList.remove("selected");
  dayEl.classList.add("selected");
}

function setDatePick(date) {
  // set day
  const dayPick = date ? endOfDay(date) : null;
  // set time
  dueDatePick = dayPick && dueDatePick ? set(dayPick, getTime(dueDatePick)) : dayPick;
  // render save btn
  dueDatePickerSave.hidden = JSON.stringify(startDueDate) === JSON.stringify(dueDatePick);

  setDueDateInInput(dueDatePick);
}

export default activeDueDatePicker;
