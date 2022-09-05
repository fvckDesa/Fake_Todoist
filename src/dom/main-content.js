import {
  mainContent,
  mainHeader,
  mainTitle,
  taskSectionList,
  taskEditor,
  editProjectBtn,
  deleteProjectBtn,
  inboxProject,
  emptyProject,
  showCompletedTasksBtn,
  showCompletedTasksIcon,
  overdueTaskContainer,
  overdueTaskSection,
  rescheduleBtn,
} from "./elements.js";
import Icons from "../assets/icons";
import todoList from "../module/todo-list";
import { createTaskElement } from "./task.js";
import { removeTaskEditor, updateProjectTaskEditor } from "./task-editor";
import activeProjectForm from "./project-form";
import activeInfoPopUp from "./info-pop-up";
import { updateProject, deleteProject, changeNumTask } from "./project.js";
import { setRandomIllustration } from "./empty-project.js";
import { createTaskSection } from "./task-section.js";
import { projectFilter, overdueFilter } from "../utils/filters";
import activeDueDatePicker from "./due-date-picker.js";
import { changeProject } from "./sidebar";

let currentProject;
let completedTaskListArr;
let filters = [];
let projectOptions = {};

overdueTaskSection.remove();

mainContent.style.cssText = `--main-header-height: ${mainHeader.clientHeight}px;`;

mainContent.addEventListener("scroll", () => {
  mainHeader.classList.toggle("scrolled", mainContent.scrollTop > 0);
});

editProjectBtn.addEventListener("click", () => {
  activeProjectForm(currentProject, (name, color) => {
    const updatedProject = todoList.updateProject(currentProject.id, {
      name,
      color,
    });
    updateProject(updatedProject);
    updateProjectTaskEditor(updatedProject);
    setTitle(updatedProject.name);
  });
});

deleteProjectBtn.addEventListener("click", () => {
  activeInfoPopUp(
    "Delete project?",
    `Are you sure you want to delete ${currentProject.name}?`,
    "Delete",
    [currentProject.name],
    deleteProjectCb
  );
});

showCompletedTasksBtn.addEventListener("click", () => toggleCompletedTasks());

rescheduleBtn.addEventListener("click", () => {
  activeDueDatePicker(rescheduleBtn, null, (dueDate) => {
    const tasks = todoList.today.filterTask(
      (task) => !task.complete && overdueFilter(task)
    );
    for (const task of tasks) {
      todoList.updateTask(task.id, { dueDate });
      setUpdatedTask(
        task,
        overdueTaskContainer.querySelector(`[data-id="${task.id}"]`),
        todoList.taskProject(task.id)
      );
    }
  });
});

function setProject(
  project,
  filtersPar = [{ filter: projectFilter }],
  options = {}
) {
  if(!project) {
    throw new Error("Project is undefined");
  }
  if (project === currentProject) return;
  changeProject(project.id);

  mainContent.classList.toggle("inbox", project === todoList.inbox);
  mainContent.classList.toggle("today", project === todoList.today);

  currentProject = project;
  projectOptions = { dueDate: null, project, ...options };
  filters = filtersPar.map((par) => par.filter);

  setTitle(project.name);
  taskSectionList.replaceChildren(
    ...filtersPar.map(({ title, filter }) => {
      if (filter === overdueFilter) {
        overdueTaskContainer.replaceChildren(
          ...project
            .filterTask((task) => !task.complete && overdueFilter(task))
            .map(createTaskElement)
        );
        overdueTaskSection.hidden = !overdueTaskContainer.hasChildNodes();
        return overdueTaskSection;
      }
      return createTaskSection({
        title,
        tasks: project.filterTask(filter),
      });
    })
  );

  completedTaskListArr = taskSectionList.querySelectorAll(
    ".task-list.completed"
  );
  
  toggleCompletedTasks(true);
  setRandomIllustration();

  mainContent.scrollTop = 0;
}

function setTitle(title) {
  // set main title
  mainTitle.textContent = title;
  // change page title
  document.title = `${title}: Todoist`;
}

function setTask(task) {
  changeNumTask(todoList.taskProject(task.id));

  const index = filters.findIndex((filter) => filter(task));
  if (index >= 0) {
    const taskSection = taskSectionList.children[index];
    const taskEl = createTaskElement(task);

    const [_, taskContainer, completedTaskContainer] = taskSection.children;
    task.complete
      ? completedTaskContainer.appendChild(taskEl)
      : taskContainer.insertBefore(taskEl, taskContainer.lastElementChild);
  }

  overdueTaskSection.hidden = !overdueTaskContainer.hasChildNodes();

  showEmptyProject();
}

function setUpdatedTask(task, taskEl, project) {
  changeNumTask(project);
  changeNumTask(currentProject);

  let index = [...taskSectionList.children].findIndex(
    (taskSection) =>
      taskSection.contains(taskEl) || taskSection.contains(taskEditor)
  );
  const filter = filters[index];

  if (!filter(task)) {
    taskSectionList.children[index].contains(taskEl)
      ? taskEl.remove()
      : taskEditor.remove();
    setTask(task);
  } else {
    removeTaskEditor();
  }

  showEmptyProject();
}

function toggleTask(taskEl, { complete, id }) {
  const taskSection = taskEl.parentElement.parentElement;
  taskEl.remove();

  changeNumTask(todoList.taskProject(id));
  overdueTaskSection.hidden = !overdueTaskContainer.hasChildNodes();
  if (taskSection === overdueTaskSection) return;

  const [_, taskContainer, completedTaskContainer] = taskSection.children;
  complete
    ? completedTaskContainer.appendChild(taskEl)
    : taskContainer.insertBefore(taskEl, taskContainer.lastElementChild);

  showEmptyProject();
}

function deleteTask(taskEl, project) {
  taskEl.remove();
  changeNumTask(project);

  showEmptyProject();
}

function showEmptyProject() {
  const numTasks = taskSectionList.querySelectorAll(
    ".task-list:not(.hidden) .task"
  ).length;

  emptyProject.hidden = numTasks > 0;
}

function toggleCompletedTasks(force) {
  completedTaskListArr.forEach((completedTaskList) => {
    completedTaskList.classList.toggle("hidden", force);
  });
  showCompletedTasksIcon.src = completedTaskListArr[0]?.classList.contains(
    "hidden"
  )
    ? Icons.ShowCompletedTasks
    : Icons.HideCompletedTasks;

  showEmptyProject();
}

function getCurrentProject() {
  return currentProject;
}

function getProjectOptions() {
  return projectOptions;
}

function deleteProjectCb () {
  todoList.deleteProject(currentProject.id);
  deleteProject(currentProject.id);
  inboxProject.click();
}

export {
  setProject,
  setTask,
  getCurrentProject,
  setUpdatedTask,
  toggleTask,
  deleteTask,
  getProjectOptions,
};
