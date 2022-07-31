// style
import "./style.css";
// active events
import "./dom/default-project";
import "./dom/sidebar";
import "./dom/topbar";
import "./dom/main-content";
import "./dom/project-form";
// start app
import setIcons from "./dom/set-icon";
import { renderProjects, createProjectElement } from "./dom/project";
import { setProject } from "./dom/main-content";
import { loadScreen } from "./dom/elements";
import todoList from "./module/todo-list";
import configApp from "./config/config";
// render icons on document
setIcons();
// set config
configApp();
// render projects save in localStorage (not Inbox)
renderProjects(...todoList.projects.slice(1).map(createProjectElement));
// set Inbox how start project
setProject(todoList.inbox);
// remove load screen when all svg are loaded
Promise.all(
  [...document.querySelectorAll("svg-loader")].map((icon) => {
    return new Promise((res, rej) => {
      icon.onLoadSvg = res;
      icon.onErrorSvg = rej;
    });
  })
).finally(() => {
    loadScreen.classList.add("start-animation");
    setTimeout(() => loadScreen.remove(), 1000);
});
