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
import { activeProjectPicker } from "./project-picker";
import { activeDueDatePicker } from "./due-date-picker";
import { format, isThisWeek, isThisYear, isToday, isTomorrow, isWeekend, isBefore, startOfToday } from "date-fns";
import { isNextWeek } from "../module/date-utilities";

let lastElement;
let project;
let task;
let dueDate = null;

taskNameInput.addEventListener("input", () => {
  taskEditorSubmit.disabled = !taskNameInput.value;
});

taskDescriptionInput.addEventListener("input", formatTaskDescription);

taskProject.addEventListener("click", () => activeProjectPicker(taskProject, setTaskProject, project));

taskDueDate.addEventListener("click", () => activeDueDatePicker(taskDueDate, setTaskDueDate, dueDate));

taskEditor.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = taskNameInput.value;
  const description = taskDescriptionInput.value;

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
  project = getCurrentProject();

  setTaskEditor(taskPar);
}

function resetTaskEditor() {
  // reset input values
  taskNameInput.value = "";
  taskDescriptionInput.value = "";
  // reset buttons
  setTaskProject(getCurrentProject());
  setTaskDueDate(null);
  // disable submit button
  taskEditorSubmit.disabled = true;
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

function setTaskProject(projectPick) {
  project = projectPick;
  taskProject.replaceChildren(...createTaskProject(projectPick));
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
    if(isBefore(date, startOfToday())) color = "--red";
    text = format(date, `d MMM${isThisYear(date) ? "" : " yyyy"}`);
  }
  if(date && isNextWeek(date)) {
    color = "--purple";
    text = format(date, "eeee");
  }
  if(date && isThisWeek(date) && isWeekend(date)) {
    color = "--blue"
    text = format(date, "eeee");
  }
  if(date && isTomorrow(date)) {
    color = "--orange";
    text = "Tomorrow";
  }
  if(date && isToday(date)) {
    color = "--green";
    text = "Today";
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
