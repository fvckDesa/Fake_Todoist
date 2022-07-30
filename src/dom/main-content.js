import {
  mainContent,
  mainHeader,
  mainTitle,
  taskContainer,
  completedTaskContainer,
  addTask,
  taskEditor,
} from "./elements.js";
import todoList from "../module/todo-list";
import { createTaskElement } from "./task.js";
import activeTaskEditor from "./task-editor";

let currentProject;

mainContent.addEventListener("scroll", () => {
  if (mainContent.scrollTop > 0) {
    mainHeader.classList.add("scrolled");
  } else {
    mainHeader.classList.remove("scrolled");
  }
});

addTask.addEventListener("click", () => {
  activeTaskEditor(addTask);
});

function setProject(id) {
  // get project
  const project = todoList.searchProjectById(id);

  if(project === currentProject || !project) return;
  
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
  // change page title
  document.title = `${project.name}: Todoist`;
}

function setTask(task) {
  taskContainer.insertBefore(createTaskElement(task), taskContainer.lastElementChild);
}

function setUpdatedTask(task, project) {
  if(project !== currentProject) {
    taskEditor.remove();
    return;
  }

  taskContainer.replaceChild(createTaskElement(task), taskEditor);
}

function setCompletedTask(taskEl) {
  completedTaskContainer.appendChild(taskEl);
}

function getCurrentProject() {
  return currentProject;
}

export { setProject, setTask, setCompletedTask, getCurrentProject, setUpdatedTask };
