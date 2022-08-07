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
  inboxProject,
  emptyProject,
  showCompletedTasksBtn,
  showCompletedTasksIcon
} from "./elements.js";
import Icons from "../assets/icons";
import todoList from "../module/todo-list";
import { createTaskElement } from "./task.js";
import activeTaskEditor, { updateProjectTaskEditor } from "./task-editor";
import activeProjectForm from "./project-form";
import activeDeleteWarning from "./delete-warning.js";
import { updateProject, deleteProject, changeNumTask } from "./project.js";
import { addTask } from "./task";
import { setRandomIllustration } from "./empty-project.js";

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

showCompletedTasksBtn.addEventListener("click", () => toggleCompletedTasks());

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

  toggleCompletedTasks(true);
  setRandomIllustration();
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

  showEmptyProject();
}

function setUpdatedTask(taskEl, project) {
  changeNumTask(project);
  changeNumTask(currentProject);
  if(project !== currentProject) {
    taskEditor.remove();
    return;
  }
  taskContainer.replaceChild(taskEl, taskEditor);

  showEmptyProject();
}

function toggleTask(taskEl, { complete, id }) {
  taskEl.remove();
  complete 
    ? completedTaskContainer.appendChild(taskEl)
    : taskContainer.insertBefore(taskEl, taskContainer.lastElementChild);
  
    changeNumTask(todoList.taskProject(id));

    showEmptyProject();
}

function deleteTask(taskEl, project) {
  taskEl.remove();
  changeNumTask(project);

  showEmptyProject();
}

function showEmptyProject() {
  const numTasks = completedTaskContainer.classList.contains("hidden")
  ? currentProject.filterTask((task) => !task.complete).length
  : currentProject.tasks.length;

  emptyProject.hidden = numTasks > 0;

  if(numTasks === 0) taskContainer.lastElementChild.replaceWith(addTaskBtn);
}

function toggleCompletedTasks(force) {
  completedTaskContainer.classList.toggle("hidden", force);
  showCompletedTasksIcon.src = completedTaskContainer.classList.contains("hidden")
    ? Icons.ShowCompletedTasks
    : Icons.HideCompletedTasks;

  showEmptyProject();
}

function getCurrentProject() {
  return currentProject;
}

export { setProject, setTask, getCurrentProject, setUpdatedTask, toggleTask, deleteTask };
