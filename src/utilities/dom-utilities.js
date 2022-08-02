import todoList from "../module/todo-list.js";
import { getCurrentProject, setTask } from "../dom/main-content.js";
import { changeNumTask } from "../dom/project";

export function addTask(project, taskAttr) {
  const task = todoList.addTask(project, taskAttr);
  project === getCurrentProject()
    ? setTask(task)
    : changeNumTask(project);
}

