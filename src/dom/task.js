import { taskTemplate } from "./elements";
import Icons from "../assets/icons";
import activeDueDatePicker from "./due-date-picker";
import activeTaskEditor from "./task-editor";
import { getDueDateInfo } from "../utils/due-date";
import todoList from "../module/todo-list";
import { deleteTask, setProject, setUpdatedTask } from "./main-content";
import activeInfoPopUp from "./info-pop-up";
import { getCurrentProject, setTask, toggleTask } from "./main-content.js";
import { createTaskProject } from "../utils/dom";
import activeTaskPage from "./task-page";

function createTaskElement(task) {
  let { name, id, dueDate, complete } = task;
  const project = todoList.taskProject(id);
  // task element and its children
  const taskEl = taskTemplate.cloneNode(true).firstElementChild;
  const [checkboxBtn, content, actionContainer] = taskEl.children;
  const checkbox = checkboxBtn.firstElementChild;
  const tic = checkbox.firstElementChild;
  const [taskName, taskDescription, taskInfo] = content.children;
  const [taskDueDate, taskProject] = taskInfo.children;
  const [dueDateIcon, dueDateText] = taskDueDate.children;
  const [editTask, changeDueDate, comment, deleteTaskBtn] =
    actionContainer.children;
  // set svg
  tic.src = Icons.TaskTic;
  dueDateIcon.src = Icons.DueDateXs;
  editTask.querySelector("svg-loader").src = Icons.Edit;
  changeDueDate.querySelector("svg-loader").src = Icons.DueDateXl;
  comment.querySelector("svg-loader").src = Icons.Comment;
  deleteTaskBtn.querySelector("svg-loader").src = Icons.GarbageContainer;
  // set attributes
  setTaskProps(task);
  taskProject.replaceChildren(
    ...(project !== getCurrentProject() ? createTaskProject(project) : [])
  );
  taskEl.setAttribute("data-id", id);
  // events
  const changeDueDateEvent = (date) => {
    dueDate = date;
    todoList.updateTask(id, { dueDate });
    setDueDate(date);
    setUpdatedTask(task, taskEl, project);
  };

  taskEl.addEventListener("click", () => activeTaskPage(project, task, {
    project: (newProject) => {
      todoList.updateTask(
        id,
        task,
        newProject === project ? null : newProject
      );
      setUpdatedTask(task, taskEl, project);
    },
    prevTask: !taskEl?.previousSibling?.classList.contains("task") ? null : () => {
      taskEl.previousSibling.click();
    },
    nextTask: !taskEl?.nextSibling?.classList.contains("task") ? null : () => {
      taskEl.nextSibling.click();
    },
    deleteTask: () => {
      activeInfoPopUp(
        "Delete task?",
        `Are you sure you want to delete ${name}?`,
        "Delete",
        [name],
        () => {
          todoList.deleteTask(id);
          deleteTask(taskEl, project);
        }
      );
    },
    dueDate: changeDueDateEvent,
    priority: (priority) => {
      todoList.updateTask(id, { ...task, priority });
      setTaskProps(task);
    },
    complete: () => {
      complete = !complete;
      todoList.updateTask(id, { complete });
      toggleTask(taskEl, task);
    },
    taskContent: (name, description) => {
      todoList.updateTask(id, { ...task, name, description });
      setTaskProps(task);
    }
  }));

  checkboxBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    checkboxBtn.classList.add("checked");
    setTimeout(() => {
      complete = !complete;
      todoList.updateTask(id, { complete });
      toggleTask(taskEl, task);
      checkboxBtn.classList.remove("checked");
    }, 210);
  });

  taskDueDate.addEventListener("click", (e) => {
    e.stopPropagation();
    activeDueDatePicker(taskDueDate, dueDate, (date) => {
      if (complete) return;
      changeDueDateEvent(date);
    });
  });

  taskProject.addEventListener("click", (e) => {
    e.stopPropagation();
    setProject(project)
  });
  // task actions
  editTask.addEventListener("click", (e) => {
    e.stopPropagation();
    activeTaskEditor(taskEl, task, (newProject, taskProps) => {
      setTaskProps(taskProps);
      todoList.updateTask(
        id,
        taskProps,
        newProject === project ? null : newProject
      );
      setUpdatedTask(task, taskEl, project);

      dueDate = task.dueDate;
    });
  });

  changeDueDate.addEventListener("click", (e) => {
    e.stopPropagation();
    changeDueDate.classList.add("active");

    activeDueDatePicker(
      changeDueDate,
      dueDate,
      (date) => {
        changeDueDateEvent(date);
        changeDueDate.classList.remove("active");
      },
      () => changeDueDate.classList.remove("active")
    );
  });

  deleteTaskBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    activeInfoPopUp(
      "Delete task?",
      `Are you sure you want to delete ${name}?`,
      "Delete",
      [name],
      () => {
        todoList.deleteTask(id);
        deleteTask(taskEl, project);
      }
    );
  });

  taskEl.setAttribute("data-id", id);

  return taskEl;

  function setTaskProps({ name, description, dueDate, priority }) {
    // task name
    if (!name) throw new Error("Task name is required");
    taskName.textContent = name;
    // task description
    taskDescription.textContent = description;
    taskDescription.hidden = !description;
    // task due date
    setDueDate(dueDate);
    // task priority
    checkbox.classList.toggle("priority-1", priority === 1);
    checkbox.classList.toggle("priority-2", priority === 2);
    checkbox.classList.toggle("priority-3", priority === 3);
  }

  function setDueDate(dueDate) {
    const { text, color } = getDueDateInfo(dueDate);

    taskDueDate.style.color = color ? `var(${color})` : "";
    dueDateText.textContent = text;

    taskDueDate.hidden = !dueDate;
  }
}

function addTask(project, taskAttr) {
  const task = todoList.addTask(project, taskAttr);
  setTask(task);
}

export { createTaskElement, addTask };
