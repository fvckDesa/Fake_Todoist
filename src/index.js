// style
import "./index.css";
// app settings
import appSettings from "./settings";
// active events
import "./dom/default-project";
import "./dom/sidebar";
import "./dom/topbar";
import "./dom/main-content";
import "./dom/project-form";
import "./dom/custom-title";
// start app
import setIcons from "./dom/set-icon";
import { renderProjects, createProjectElement } from "./dom/project";
import { loadScreen } from "./dom/elements";
import todoList from "./module/todo-list";
import { setHomeViewProject } from "./utils/dom";
// render icons on document
setIcons();
// render projects save in localStorage (not Inbox)
renderProjects(...todoList.projects.slice(1).map(createProjectElement));
// set home view project
setHomeViewProject();
// remove load screen when all svg are loaded
Promise.all(
  [...document.querySelectorAll("svg-loader")].map((icon) => {
    return new Promise((res, rej) => {
      icon.onLoadSvg = res;
      icon.onErrorSvg = rej;
      setTimeout(() => rej("timeout"), 10000);
    });
  })
).finally(() => {
    loadScreen.classList.add("start-animation");
    setTimeout(() => loadScreen.remove(), 1000);
});
