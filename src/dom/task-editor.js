import {
  taskContainer,
  taskEditor,
  taskNameInput,
  taskDescriptionInput,
  taskEditorSubmit,
  taskProject,
  taskDueDate
} from "./elements";
import Icons from "../assets/icons";
import { getCurrentProject } from "./main-content";
import activeProjectPicker from "./project-picker";
import activeDueDatePicker from "./due-date-picker";
import { getDueDateInfo } from "../utils/due-date";
import { createTaskProject } from "../utils/dom";

let lastElement;
let project;
let dueDate = null;
let submitCb;

taskNameInput.addEventListener("input", () => {
  taskEditorSubmit.disabled = !taskNameInput.value;
});

taskDescriptionInput.addEventListener("input", formatTaskDescription);

taskProject.addEventListener("click", () => activeProjectPicker(taskProject, project, setTaskProject));

taskDueDate.addEventListener("click", () => activeDueDatePicker(taskDueDate, dueDate, setTaskDueDate));

taskEditor.addEventListener("submit", (e) => {
  e.preventDefault();
  
  submitCb(project, {
    name: taskNameInput.value,
    description: taskDescriptionInput.value,
    dueDate,
  });

  resetTaskEditor();
});

taskEditor.addEventListener("reset", () => {
  resetTaskEditor();
  removeTaskEditor();
});

function activeTaskEditor(el, taskPar, next = () => {}) {
  // render task editor
  if (taskContainer.contains(taskEditor)) removeTaskEditor();
  taskContainer.replaceChild(taskEditor, el);
  // change state
  lastElement = el;
  project = getCurrentProject();
  submitCb = next;

  setTaskEditor(taskPar ?? {});
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
