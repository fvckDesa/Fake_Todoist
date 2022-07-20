import "./style.css";

import setIcons from "./dom/set-icon";
import activeSidebar from "./dom/sidebar";
import activeTopbar from "./dom/topbar";
import setMainContent from "./dom/main-content";
import activeProjectForm from "./dom/project-form";
import { renderProjects, createProjectElement } from "./dom/project";
import todoList from "./module/todo-list";

setIcons();
activeProjectForm();
renderProjects(...todoList.projects.slice(1).map(createProjectElement));
