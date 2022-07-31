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

function setProject(project) {
  if(project === currentProject || !project) return;
  
  currentProject = project;
  // set main title
  mainTitle.textContent = project.name;
  // set tasks
  taskContainer.replaceChildren(
    ...project
    // get uncompleted tasks and create their elements
      .filterTask((task) => !task.complete)
      .map(createTaskElement)
      // add "add task" button at the end
      .concat(addTask)
  );
  completedTaskContainer.replaceChildren(
    ...project
    // get completed tasks and create their elements
      .filterTask((task) => task.complete)
      .map(createTaskElement)
  );
  // change page title
  document.title = `${project.name}: Todoist`;
}

function setTask(task) {
  taskContainer.insertBefore(createTaskElement(task), taskContainer.lastElementChild);
}

function setUpdatedTask(task, project, id) {
  if(project !== currentProject) {
    taskEditor.remove();
    return;
  }
  if(id) {
    const taskEl = taskContainer.querySelector(`[data-id="${id}"]`);
    taskEl.replaceWith(createTaskElement(task));
    return;
  }
  taskContainer.replaceChild(createTaskElement(task), taskEditor);
}

function toggleTask({ id, complete }) {
  const taskEl = mainContent.querySelector(`[data-id="${id}"]`);
  taskEl.remove();
  complete 
    ? completedTaskContainer.appendChild(taskEl)
    : taskContainer.insertBefore(taskEl, taskContainer.lastElementChild);
}

function getCurrentProject() {
  return currentProject;
}

export { setProject, setTask, getCurrentProject, setUpdatedTask, toggleTask };
