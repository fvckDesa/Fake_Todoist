import {
  taskContainer,
  taskEditor,
  taskNameInput,
  taskDescriptionInput,
  taskEditorSubmit,
  taskProject
} from "./elements";
import todoList from "../module/todo-list";
import Icons from "../assets/svg";
import { setTask, getCurrentProject } from "./main-content";
import { activeProjectPicker, getProjectPick } from "./project-picker";

let lastElement;

taskNameInput.addEventListener("input", () => {
  taskEditorSubmit.disabled = !taskNameInput.value;
});

taskDescriptionInput.addEventListener("input", formatTaskDescription);

taskProject.addEventListener("click", () => activeProjectPicker(taskProject));

taskEditor.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = taskNameInput.value;
  const description = taskDescriptionInput.value;
  //const dueDate = Date.now();
  const project = getProjectPick();

  const newTask = todoList.addTask(project.name, { name, description });

  if (project === getCurrentProject()) setTask(newTask);

  resetTaskEditor();
});

taskEditor.addEventListener("reset", () => {
  resetTaskEditor();
  removeTaskEditor();
});

function resetTaskEditor() {
  taskNameInput.value = "";
  taskDescriptionInput.value = "";
  setTaskProject(getCurrentProject());
}

function removeTaskEditor() {
  taskContainer.replaceChild(lastElement, taskEditor);
}

function setTaskEditor(element) {
  if (taskContainer.contains(taskEditor)) removeTaskEditor();
  taskContainer.replaceChild(taskEditor, element);
  lastElement = element;
  // set current project
  setTaskProject(getCurrentProject());
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

export { setTaskEditor, formatTaskDescription, setTaskProject };
