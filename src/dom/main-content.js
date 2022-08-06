import {
  mainContent,
  mainHeader,
  mainTitle,
  taskContainer,
  completedTaskContainer,
  addTaskBtn,
  taskEditor,
  editProjectBtn,
  deleteProjectBtn,
  inboxProject
} from "./elements.js";
import todoList from "../module/todo-list";
import { createTaskElement } from "./task.js";
import activeTaskEditor, { updateProjectTaskEditor } from "./task-editor";
import activeProjectForm from "./project-form";
import activeDeleteWarning from "./delete-warning.js";
import { updateProject, deleteProject, changeNumTask } from "./project.js";
import { addTask } from "../utilities/task";

let currentProject;

mainContent.addEventListener("scroll", () => {
  if (mainContent.scrollTop > 0) {
    mainHeader.classList.add("scrolled");
  } else {
    mainHeader.classList.remove("scrolled");
  }
});

editProjectBtn.addEventListener("click", () => {
  activeProjectForm(currentProject, (name, color) => {
    const updatedProject = todoList.updateProject(currentProject.id, { name, color });
    updateProject(updatedProject);
    updateProjectTaskEditor(updatedProject);
    setTitle(updatedProject.name);
  });
});

deleteProjectBtn.addEventListener("click", () => {
  activeDeleteWarning(currentProject.name, () => {
    todoList.deleteProject(currentProject.id);
    deleteProject(currentProject.id);
    inboxProject.click();
  });
});

addTaskBtn.addEventListener("click", () => {
  activeTaskEditor(addTaskBtn, null, addTask);
});

function setProject(project) {
  if(project === currentProject || !project) return;
  
  [editProjectBtn, deleteProjectBtn].forEach(el => el.classList.toggle("invisible", project === todoList.inbox));

  currentProject = project;

  setTitle(project.name);

  // set tasks
  taskContainer.replaceChildren(
    ...project
    // get uncompleted tasks and create their elements
      .filterTask((task) => !task.complete)
      .map(createTaskElement)
      // add "add task" button at the end
      .concat(addTaskBtn)
  );
  completedTaskContainer.replaceChildren(
    ...project
    // get completed tasks and create their elements
      .filterTask((task) => task.complete)
      .map(createTaskElement)
  );
}

function setTitle(title) {
  // set main title
  mainTitle.textContent = title;
  // change page title
  document.title = `${title}: Todoist`;
}

function setTask(task) {
  changeNumTask(todoList.taskProject(task.id));
  taskContainer.insertBefore(createTaskElement(task), taskContainer.lastElementChild);
}

function setUpdatedTask(task, project, id) {
  changeNumTask(project);
  changeNumTask(currentProject);
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
  
    changeNumTask(todoList.taskProject(id));
}

function getCurrentProject() {
  return currentProject;
}

export { setProject, setTask, getCurrentProject, setUpdatedTask, toggleTask };
