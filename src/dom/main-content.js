import {
  mainContent,
  mainHeader,
  mainTitle,
  taskContainer,
  completedTaskContainer,
  addTask,
} from "./elements.js";
import todoList from "../module/todo-list";
import { createTaskElement } from "./task.js";
import { setTaskEditor } from "./task-editor";
import { setProjectPick } from "./project-picker";

let currentProject;

mainContent.addEventListener("scroll", () => {
  if (mainContent.scrollTop > 0) {
    mainHeader.classList.add("scrolled");
  } else {
    mainHeader.classList.remove("scrolled");
  }
});

addTask.addEventListener("click", () => {
  setTaskEditor(addTask);
});

function setProject(name) {
  // get project
  const project = todoList.find((project) => project.name === name);
  currentProject = project;
  // set main title
  mainTitle.textContent = project.name;
  // set tasks
  taskContainer.replaceChildren(
    ...project
    // get uncompleted tasks and create their elements
      .filterTask((task) => !task.completed)
      .map(createTaskElement)
      // add "add task" button at the end
      .concat(addTask)
  );
  completedTaskContainer.replaceChildren(
    ...project
    // get completed tasks and create their elements
      .filterTask((task) => task.completed)
      .map(createTaskElement)
  );

  setProjectPick(currentProject);
  // change page title
  document.title = `${project.name}: Todoist`;
}

function setTask(task) {
  taskContainer.insertBefore(createTaskElement(task), taskContainer.lastElementChild);
}

function setCompletedTask(taskEl) {
  completedTaskContainer.appendChild(taskEl);
}

function getCurrentProject() {
  return currentProject;
}

export { setProject, setTask, setCompletedTask, getCurrentProject };
