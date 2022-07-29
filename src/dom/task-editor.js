import {
  taskContainer,
  taskEditor,
  taskNameInput,
  taskDescriptionInput,
  taskEditorSubmit,
  taskProject,
  taskDueDate
} from "./elements";
import todoList from "../module/todo-list";
import Icons from "../assets/svg";
import { setTask, getCurrentProject } from "./main-content";
import { activeProjectPicker, getProjectPick } from "./project-picker";
import { activeDueDatePicker, getDatePick } from "./due-date-picker";
import { format, isThisWeek, isThisYear, isToday, isTomorrow, isWeekend, isBefore } from "date-fns";
import { isNextWeek } from "../module/date-utilities";

let lastElement;
let task;
let dueDate;

taskNameInput.addEventListener("input", () => {
  taskEditorSubmit.disabled = !taskNameInput.value;
});

taskDescriptionInput.addEventListener("input", formatTaskDescription);

taskProject.addEventListener("click", () => activeProjectPicker(taskProject, setTaskProject));

taskDueDate.addEventListener("click", () => activeDueDatePicker(taskDueDate, setTaskDueDate, dueDate));

taskEditor.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = taskNameInput.value;
  const description = taskDescriptionInput.value;
  const dueDate = getDatePick();
  const project = getProjectPick();

  const newTask = todoList.addTask(project.name, { name, description, dueDate });

  if (project === getCurrentProject()) setTask(newTask);

  resetTaskEditor();
});

taskEditor.addEventListener("reset", () => {
  resetTaskEditor();
  removeTaskEditor();
});

function activeTaskEditor(el, taskPar = {}) {
  // render task editor
  if (taskContainer.contains(taskEditor)) removeTaskEditor();
  taskContainer.replaceChild(taskEditor, el);
  // change state
  lastElement = el;
  task = taskPar;

  setTaskEditor(taskPar);
}

function resetTaskEditor() {
  taskNameInput.value = "";
  taskDescriptionInput.value = "";
  setTaskProject(getCurrentProject());
  setTaskDueDate(null);
}

function removeTaskEditor() {
  taskContainer.replaceChild(lastElement, taskEditor);
}

function setTaskEditor({ name = "", description = "", dueDate = null }) {
  // set input values
  taskNameInput.value = name;
  taskDescriptionInput.value = description;
  // set current project
  setTaskProject(getCurrentProject());
  // set due date
  setTaskDueDate(dueDate);
}

function setTaskProject(project) {
  taskProject.replaceChildren(...createTaskProject(project));
}

function createTaskProject({ name, color }) {
    const icon = document.createElement("svg-loader");
    icon.src = color ? Icons.Circle : Icons.Inbox;
    icon.style.color = color;

    const text = document.createElement("span");
    text.textContent = name;

    return [icon, text];
}

function setTaskDueDate(date) {
  dueDate = date;

  let color = "", text = "";
  if(!date) {
    text = "Due Date";
  }
  if(date) {
    if(isBefore(date, new Date())) color = "--red";
    text = format(date, `d MMM${isThisYear(date) ? "" : " yyyy"}`);
  }
  if(date && isToday(date)) {
    color = "--green";
    text = "Today";
  }
  if(date && isTomorrow(date)) {
    color = "--orange";
    text = "Tomorrow";
  }
  if(date && isThisWeek(date, { weekStartsOn: 1 }) && isWeekend(date)) {
    color = "--blue"
    text = format(date, "eeee");
  }
  if(date && isNextWeek(date)) {
    color = "--purple";
    text = format(date, "eeee");
  }

  taskDueDate.style.color = color ? `var(${color})` : "";
  taskDueDate.lastElementChild.innerText = text;
}

function formatTaskDescription() {
  const lineHeight = parseInt(
    getComputedStyle(taskDescriptionInput).getPropertyValue("line-height")
  );
  const numNewLine = taskDescriptionInput.value
    .split("\n")
    .map((el) =>
      Math.ceil(el.length / (taskDescriptionInput.scrollWidth / 5.6))
    )
    .reduce((sum, n) => sum + n, taskDescriptionInput.value.split("\n").length);

  taskDescriptionInput.style.cssText = `--height: ${numNewLine * lineHeight}px`;
}

export { activeTaskEditor, formatTaskDescription, setTaskProject };
