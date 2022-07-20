import "./style.css";

import setIcons from "./dom/set-icon";
import activeSidebar from "./dom/sidebar";
import activeTopbar from "./dom/topbar";
import setMainContent from "./dom/main-content";
import activeProjectForm from "./dom/project-form";
import { setTaskEditor } from "./dom/task-editor";
import { addTask } from "./dom/elements";
import { setProjects, createProjectElement } from "./dom/project";
import todoList from "./module/todo-list";

setIcons();
activeProjectForm();
setProjects(...todoList.projects.map(createProjectElement));

addTask.addEventListener("click", () => {
  setTaskEditor(addTask);
});
