import "./style.css";

import setIcons from "./dom/set-icon";
import activeSidebar from "./dom/sidebar";
import activeTopbar from "./dom/topbar";
import setMainContent from "./dom/main-content";
import activeProjectForm from "./dom/project-form";
import { renderProjects, createProjectElement } from "./dom/project";
import { setProject } from "./dom/main-content";
import todoList from "./module/todo-list";
import { loadScreen } from "./dom/elements";

setIcons();
activeProjectForm();
renderProjects(...todoList.projects.slice(1).map(createProjectElement));
setProject("Inbox");
// remove load screen when all svg are loaded
Promise.all(
  [...document.querySelectorAll("svg-loader")].map((icon) => {
    return new Promise((res, rej) => {
      icon.onLoadSvg = res;
      icon.onErrorSvg = rej;
    });
  })
).then(() => {
    loadScreen.classList.add("start-animation");
    setTimeout(() => loadScreen.remove(), 500);
});
