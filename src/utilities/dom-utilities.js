import todoList from "../module/todo-list.js";
import { getCurrentProject, setTask, setUpdatedTask } from "../dom/main-content.js";
import { changeNumTask } from "../dom/project";

export function addTask(project, taskAttr) {
  const task = todoList.addTask(project, taskAttr);
  project === getCurrentProject()
    ? setTask(task)
    : changeNumTask(project);
}

export function updateTask(id, project, taskAttr) {
  const task = todoList.updateTask(id, taskAttr, project !== getCurrentProject() ? project : null);
  project === getCurrentProject()
    ? setUpdatedTask(task, project, id)
    : changeNumTask(project);
}

