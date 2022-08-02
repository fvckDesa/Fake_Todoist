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
import { getCurrentProject, setUpdatedTask } from "./main-content";
import activeProjectPicker from "./project-picker";
import activeDueDatePicker from "./due-date-picker";
import { getDueDateInfo } from "../utilities/date-utilities";
import { addTask } from "../utilities/dom-utilities.js";

let lastElement;
let project;
let taskId;
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
  if(taskId) {
    const task = todoList.updateTask(
      taskId,
      { name, description, dueDate },
      project !== getCurrentProject() ? project : null
    );
    setUpdatedTask(task, project);
  }
  if(!taskId) {
    addTask(project, { name, description, dueDate });
  }
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
  taskId = taskPar.id;
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
  // disable submit button
  taskEditorSubmit.disabled = !taskNameInput.value;
  // change submit button text
  taskEditorSubmit.innerText = name ? "Save" : "Add task";
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

  const { text, color } = getDueDateInfo(date);

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

function updateProjectTaskEditor(project) {
  if(project !== getCurrentProject()) return;

  setTaskProject(project);
}

export default activeTaskEditor;

export { formatTaskDescription, updateProjectTaskEditor };
