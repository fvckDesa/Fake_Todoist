import {
  timePickerContainer,
  timePicker,
  timePickerInput,
  timePickerSubmit,
} from "./elements";
import { parseTime, checkTimeValidity, formatTimeString } from "../utilities/time";

let submitCb;

timePickerContainer.addEventListener("click", (e) => {
  e.stopPropagation();

  timePickerContainer.classList.add("hidden");

  resetTimePicker();
});

timePicker.addEventListener("submit", (e) => {
  e.preventDefault();

  submitCb(parseTime(timePickerInput.value));

  resetTimePicker();
});

timePicker.addEventListener("reset", resetTimePicker);

timePicker.addEventListener("click", (e) => {
  e.stopPropagation();
});

timePickerInput.addEventListener("input", () => {
  timePickerInput.classList.toggle("invalid-time", !checkTimeValidity(timePickerInput.value));
  timePickerSubmit.disabled = !checkTimeValidity(timePickerInput.value);
});

function activeTimePicker(el, time, next = () => {}) {
  timePickerContainer.classList.remove("hidden");

  submitCb = next;

  time && setTime(time);

  timePickerSubmit.innerText = time ? "Change" : "Add";

  positionTimePicker(el);
}

function setTime(time) {
  timePickerInput.value = formatTimeString(time);

  timePickerSubmit.disabled =
    !timePickerInput.checkValidity() && timePickerInput.value.length > 0;
}

function positionTimePicker(el) {
  const { top, left, width } = el.getBoundingClientRect();
  const { width: timePickerWidth, height: timePickerHeight } =
    timePicker.getBoundingClientRect();
  const { width: bodyWidth } = document.body.getBoundingClientRect();

  const x = Math.min(
    Math.max(left + width / 2 - timePickerWidth / 2, 0),
    bodyWidth
  );
  const y = top - timePickerHeight;
  timePicker.style.cssText = `
        transform: translate(${x}px, ${y}px);
    `;
}

function resetTimePicker() {
  timePickerContainer.classList.add("hidden");
  timePickerInput.value = "";
  timePickerSubmit.disabled = true;
}

export default activeTimePicker;
