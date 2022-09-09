import {
  mainContent,
  mainHeader,
  mainTitle,
  taskSectionList,
  taskEditor,
  editProjectBtn,
  deleteProjectBtn,
  emptyProject,
  showCompletedTasksBtn,
  showCompletedTasksIcon,
  overdueTaskContainer,
  overdueTaskSection,
  rescheduleBtn,
  notFound,
  notFoundBackHomeView,
  importProjectBtn,
  exportProjectBtn,
  dragOverScreen,
  importProjectContainer,
  dragOverFileInput
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
import { setHomeViewProject } from "../utils/dom.js";
import appSettings, { changeSettings } from "../settings/index.js";
import activeExportProject from "./export-project.js";
import activeImportProject from "./import-project.js";
import { filterTask } from "../utils/task.js";
import { parseFile } from "../utils/file";

let currentProject;
let completedTaskListArr;
let filters = [];
let projectOptions = {};
let dragOverTimeout;

overdueTaskSection.remove();

mainContent.style.cssText = `--main-header-height: ${mainHeader.clientHeight}px;`;

document.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if(currentProject === todoList.today) return;

  dragOverScreen.classList.remove("hidden");

  clearTimeout(dragOverTimeout);
  dragOverTimeout = setTimeout(() => {
    dragOverScreen.classList.add("hidden");
  }, 300);
}, false);

document.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if(currentProject === todoList.today) return;
  e.dataTransfer.dropEffect = "copy";
  const file = e.dataTransfer.files[0];

  importTasks(file);
}, false);

dragOverFileInput.addEventListener("change", () => importTasks(dragOverFileInput.files[0]), false);

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

notFoundBackHomeView.addEventListener("click", () => {
  if(!todoList.searchProjectById(appSettings.homeView)) {
    changeSettings("homeView", todoList.today.id);
  }
  setHomeViewProject();
});

exportProjectBtn.addEventListener("click", () => {
  activeExportProject(
    currentProject.name,
    currentProject.tasks.map(filterTask)
  );
});

importProjectBtn.addEventListener("click", () => {
  activeImportProject(setImportedTasks);
});

function setProject(
  project,
  filtersPar = [{ filter: projectFilter }],
  options = {}
) {
  notFound.hidden = project;
  if(!project) {
    document.title = "Todoist";
    return;
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
  setHomeViewProject();
}

function setImportedTasks(tasks) {
  for(const task of tasks) {
    const newTask = todoList.addTask(currentProject, task);
    setTask(newTask);
  }
}

async function importTasks(file) {
  if(!file) return;
  
  try {
    setImportedTasks(await parseFile(file));
  } catch (err) {
    const { message } = err;
    if (!message.includes("file type is not supported")) {
      throw new Error(err);
    }
    activeInfoPopUp(
      "Error",
      message,
      "Search file",
      [message.replace("file type is not supported", "")],
      () => {
        dragOverFileInput.click();
      }
    );
  }

  dragOverScreen.classList.add("hidden");
  importProjectContainer.classList.add("hidden");
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
