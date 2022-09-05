import {
  taskEditor,
  taskNameInput,
  taskDescriptionInput,
  taskEditorSubmit,
  taskProject,
  taskDueDate,
  mainContent
} from "./elements";
import activeProjectPicker from "./project-picker";
import activeDueDatePicker from "./due-date-picker";
import { getDueDateInfo } from "../utils/due-date";
import { createTaskProject } from "../utils/dom";
import todoList from "../module/todo-list";
import { getProjectOptions } from "./main-content";

let lastElement;
let project;
let dueDate = null;
let submitCb;

const resizeObserver = new ResizeObserver(formatTaskDescription);
resizeObserver.observe(taskDescriptionInput);

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
  if (mainContent.contains(taskEditor)) removeTaskEditor();
  el.replaceWith(taskEditor);
  // change state
  lastElement = el;
  project = taskPar?.id ? todoList.taskProject(taskPar.id) : getProjectOptions().project;
  submitCb = next;

  setTaskEditor(taskPar ?? {});
}

function resetTaskEditor() {
  // reset input values
  taskNameInput.value = "";
  taskDescriptionInput.value = "";
  // reset buttons
  setTaskProject(getProjectOptions().project);
  setTaskDueDate(getProjectOptions().dueDate);
  
  taskEditorSubmit.disabled = true;
}

function removeTaskEditor() {
  taskEditor.replaceWith(lastElement);
}

function setTaskEditor({ name = "", description = "", dueDate = getProjectOptions().dueDate }) {
  // set input values
  taskNameInput.value = name;
  taskDescriptionInput.value = description;
  // set current project
  setTaskProject(project);
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
  taskDescriptionInput.style.height = 'auto';
  taskDescriptionInput.style.height = `${taskDescriptionInput.scrollHeight}px`;
}

function updateProjectTaskEditor(newProject) {
  if(project?.id !== newProject.id) return;

  setTaskProject(newProject);
}

export default activeTaskEditor;

export { updateProjectTaskEditor, removeTaskEditor };
