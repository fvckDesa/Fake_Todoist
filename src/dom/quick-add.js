import {
  quickAddContainer,
  quickAdd,
  quickAddNameInput,
  quickAddDescriptionInput,
  quickAddDueDate,
  quickAddProject,
  quickAddSubmitBtn
} from "./elements";
import { getCurrentProject } from "./main-content";
import Icons from "../assets/svg";
import { getDueDateInfo } from "../utils/due-date";
import activeProjectPicker from "./project-picker";
import activeDueDatePicker from "./due-date-picker";

let project;
let dueDate;
let submitCb;

quickAddContainer.addEventListener("animationend", (e) => {
  if (e.animationName === "modal-disappear") {
    quickAddContainer.classList.add("hidden");
  }
});

quickAddContainer.addEventListener("click", closeQuickAdd);

quickAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  submitCb(project, {
    name: quickAddNameInput.value,
    description: quickAddDescriptionInput.value,
    dueDate,
  });

  quickAddContainer.classList.add("disappear");
  closeQuickAdd();
});

quickAdd.addEventListener("reset", closeQuickAdd);

quickAdd.addEventListener("click", (e) => {
  e.stopPropagation();
});

quickAddNameInput.addEventListener("input", () => {
  quickAddSubmitBtn.disabled = !quickAddNameInput.value;
});

quickAddDueDate.addEventListener("click", () =>
  activeDueDatePicker(quickAddDueDate, dueDate, setTaskDueDate)
);

quickAddProject.addEventListener("click", () =>
  activeProjectPicker(quickAddProject, project, setTaskProject)
);

function activeQuickAdd(next = () => {}) {
  quickAddContainer.classList.remove("hidden", "disappear");

  submitCb = next;
  project = getCurrentProject();
  dueDate = null;

  setTaskProject(project);
  setTaskDueDate(dueDate);
}

function closeQuickAdd() {
  quickAddContainer.classList.add("disappear");
  // reset input values
  quickAddNameInput.value = "";
  quickAddDescriptionInput.value = "";
  
  quickAddSubmitBtn.disabled = true;
}

function setTaskProject(projectPick) {
  project = projectPick;
  quickAddProject.replaceChildren(...createTaskProject(projectPick));
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

  quickAddDueDate.style.color = color ? `var(${color})` : "";
  quickAddDueDate.lastElementChild.innerText = text;
}

export default activeQuickAdd;
