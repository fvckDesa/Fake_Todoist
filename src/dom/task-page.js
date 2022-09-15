import {
  taskPageContainer,
  taskPage,
  taskPageHeaderProject,
  taskPagePrevTask,
  taskPageNextTask,
  taskPageDeleteTask,
  taskPageClose,
  taskPageCheckbox,
  taskPageName,
  taskPageDescription,
  taskDetailProject,
  taskDetailDueDateContainer,
  taskDetailDueDate,
  taskDetailDueDateUnset,
  taskDetailPriority,
  taskDefaultDescription,
  taskPageContent,
  taskPageContentName,
  taskPageContentDescription,
} from "./elements";

import { createTaskProject } from "../utils/dom";
import activeProjectPicker from "./project-picker";
import activeDueDatePicker from "./due-date-picker";
import { getDueDateInfo } from "../utils/due-date";
import activePrioritySelector from "./priority-selector";
import Icons from "../assets/icons";
import { setProject } from "./main-content";

const contentEditor = createContentEditor();

let currentTask;
let currentTaskProject;
let currentTaskEvents;

taskPageContainer.addEventListener("click", () => {
  taskPageContainer.classList.add("hidden");
});

taskPage.addEventListener("click", (e) => {
  e.stopPropagation();
});

taskPageHeaderProject.addEventListener("click", () => {
  setProject(currentTaskProject);
  taskPageContainer.classList.add("hidden");
});

taskPagePrevTask.addEventListener("click", () => currentTaskEvents.prevTask());

taskPageNextTask.addEventListener("click", () => currentTaskEvents.nextTask());

taskPageDeleteTask.addEventListener("click", () => {
  currentTaskEvents.deleteTask();
});

taskPageClose.addEventListener("click", () => {
  taskPageContainer.classList.add("hidden");
});

taskDetailProject.addEventListener("click", () => {
  if(currentTask.complete || taskPage.classList.contains("content-editor-active")) return;
  activeProjectPicker(taskDetailProject, currentTaskProject, (newProject) => {
    setTaskPageProject(newProject);
    currentTaskEvents.project(newProject);
  });
});

taskDetailDueDate.addEventListener("click", () => {
  if(currentTask.complete || taskPage.classList.contains("content-editor-active")) return;
  activeDueDatePicker(taskDetailDueDate, currentTask.dueDate, (date) => {
    setTaskPageDueDate(date);
    currentTaskEvents.dueDate(date);
  });
});

taskDetailDueDate.lastElementChild.addEventListener("click", (e) => {
  if(currentTask.complete || taskPage.classList.contains("content-editor-active")) return;
  e.stopPropagation();
  setTaskPageDueDate(null);
  currentTaskEvents.dueDate(null);
});

taskDetailDueDateUnset.addEventListener("click", () => {
  if(currentTask.complete || taskPage.classList.contains("content-editor-active")) return;
  activeDueDatePicker(taskDetailDueDateUnset, currentTask.dueDate, (date) => {
    setTaskPageDueDate(date);
    currentTaskEvents.dueDate(date);
  });
});

taskDetailPriority.addEventListener("click", () => {
  if(currentTask.complete || taskPage.classList.contains("content-editor-active")) return;
  activePrioritySelector(
    taskDetailPriority,
    currentTask.priority,
    (priority) => {
      setTaskPagePriority(priority);
      currentTaskEvents.priority(priority);
    }
  );
});

taskPageCheckbox.addEventListener("click", () => {
  if(taskPage.classList.contains("content-editor-active")) return;
  taskPageCheckbox.classList.toggle("checked");
  taskPageCheckbox.parentElement.classList.toggle("completed");
  taskPage.classList.toggle("complete");
  currentTaskEvents.complete();
});

taskPageContentName.addEventListener("click", () => {
  if(currentTask.complete || taskPage.classList.contains("content-editor-active")) return;
  activeContentEditor(currentTask.name, currentTask.description);
  contentEditor.querySelector(".task-name-input").focus();
});

taskPageContentDescription.addEventListener("click", () => {
  if(currentTask.complete || taskPage.classList.contains("content-editor-active")) return;
  activeContentEditor(currentTask.name, currentTask.description);
  contentEditor.querySelector(".task-description-input").focus();
});

taskDefaultDescription.addEventListener("click", () => {
  if(currentTask.complete || taskPage.classList.contains("content-editor-active")) return;
  activeContentEditor(currentTask.name, currentTask.description);
  contentEditor.querySelector(".task-description-input").focus();
});

export default function activeTaskPage(project, task, events) {
  currentTask = task;
  currentTaskEvents = events;
  currentTaskProject = project;

  setTaskContent(task.name, task.description);
  setTaskPageProject(project);
  setTaskPageDueDate(task.dueDate);
  setTaskPagePriority(task.priority);

  taskPage.classList.toggle("complete", task.complete);
  taskPageCheckbox.parentElement.classList.toggle("completed", task.complete);

  taskPagePrevTask.disabled = !events.prevTask;
  taskPageNextTask.disabled = !events.nextTask;

  taskPageContainer.classList.remove("hidden");
}

function setTaskPageProject(project) {
  taskPageHeaderProject.replaceChildren(...createTaskProject(project));
  taskDetailProject.replaceChildren(
    ...createTaskProject(project),
    taskDetailProject.lastElementChild
  );
}

function setTaskPageDueDate(date) {
  taskDetailDueDateContainer.classList.toggle("unset", !date);

  const { text, color } = getDueDateInfo(date);
  taskDetailDueDate.style.color = color ? `var(${color})` : "";
  taskDetailDueDate.children[1].innerText = text;
}

function setTaskPagePriority(priority) {
  taskDetailPriority.dataset.priority = priority;
  taskDetailPriority.firstElementChild.src =
    priority === 4 ? Icons.OutLineFlag : Icons.LinearFlag;
  taskDetailPriority.children[1].innerText = `P${priority}`;

  taskPageCheckbox.firstElementChild.classList.toggle(
    "priority-1",
    priority === 1
  );
  taskPageCheckbox.firstElementChild.classList.toggle(
    "priority-2",
    priority === 2
  );
  taskPageCheckbox.firstElementChild.classList.toggle(
    "priority-3",
    priority === 3
  );
}

function setTaskContent(name, description) {
  taskPageName.innerText = name;
  taskPageDescription.innerText = description;
  taskPageDescription.classList.toggle("hidden", description.length === 0);
  taskDefaultDescription.classList.toggle("hidden", description.length > 0);
}

function activeContentEditor(name, description) {  
  taskPageContent.replaceWith(contentEditor);

  contentEditor.querySelector(".task-name-input").value = name;
  contentEditor.querySelector(".task-description-input").value = description;
  contentEditor.querySelector(".placeholder-icon").classList.toggle("hidden", description.length > 0);

  taskPage.classList.add("content-editor-active");
}

function createContentEditor() {
  const contentEditor = document.createElement("form");
  contentEditor.className = "content-editor";

  const contentEditorArea = document.createElement("div");
  contentEditorArea.className = "content-editor-area";

  const contentName = document.createElement("input");
  contentName.className = "task-name-input";
  contentName.placeholder = "Task name";

  const contentDescription = document.createElement("div");
  contentDescription.className = "content-editor-area-description";

  const contentDescriptionInput = document.createElement("textarea");
  contentDescriptionInput.className = "task-description-input";
  contentDescriptionInput.placeholder = "Description";

  const placeholderIcon = document.createElement("svg-loader");
  placeholderIcon.className = "placeholder-icon";
  placeholderIcon.src = Icons.Text;

  contentDescription.append(placeholderIcon, contentDescriptionInput);

  contentEditorArea.append(contentName, contentDescription);

  const contentEditorFooter = document.createElement("footer");
  contentEditorFooter.className = "content-editor-footer";

  const resetBtn = document.createElement("button");
  resetBtn.innerText = "Cancel";
  resetBtn.className = "secondary-btn";
  resetBtn.type = "reset";

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Save";
  submitBtn.className = "primary-btn";
  submitBtn.type = "submit";

  contentEditorFooter.append(resetBtn, submitBtn);

  contentEditor.append(contentEditorArea, contentEditorFooter);

  contentName.addEventListener("input", () => {
    submitBtn.disabled = contentName.value.length === 0;
  });

  contentDescriptionInput.addEventListener("input", () => {
    contentDescriptionInput.style.height = "auto";
    contentDescriptionInput.style.height = `${contentDescriptionInput.scrollHeight}px`;
    placeholderIcon.classList.toggle("hidden", contentDescriptionInput.value.length > 0);
  });

  contentEditor.addEventListener("reset", () => {
    contentEditor.replaceWith(taskPageContent);
    taskPage.classList.remove("content-editor-active");
  });
  
  contentEditor.addEventListener("submit", (e) => {
    e.preventDefault();
    setTaskContent(contentName.value, contentDescriptionInput.value);
    currentTaskEvents.taskContent(contentName.value, contentDescriptionInput.value);
    contentEditor.replaceWith(taskPageContent);
    taskPage.classList.remove("content-editor-active");
  });

  return contentEditor;
}