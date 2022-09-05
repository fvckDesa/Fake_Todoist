// style
import "./styles/global.css";
import "./styles/themes.css";
import "./styles/top-bar.css";
import "./styles/side-bar.css";
import "./styles/main-content.css";
import "./styles/task-section.css";
import "./styles/project-form.css";
import "./styles/task.css";
import "./styles/task-editor.css";
import "./styles/load-screen.css";
import "./styles/project-picker.css";
import "./styles/due-date-picker.css";
import "./styles/delete-warning.css";
import "./styles/quick-add.css";
import "./styles/settings.css";
import "./styles/theme-page.css";
import "./styles/general-page.css";
// app settings
import appSettings from "./settings";
// active events
import "./dom/default-project";
import "./dom/sidebar";
import "./dom/topbar";
import "./dom/main-content";
import "./dom/project-form";
// start app
import setIcons from "./dom/set-icon";
import { renderProjects, createProjectElement } from "./dom/project";
import { loadScreen } from "./dom/elements";
import todoList from "./module/todo-list";
import { setTodayProject } from "./dom/default-project";
import { setProject } from "./dom/main-content";
// render icons on document
setIcons();
// render projects save in localStorage (not Inbox)
renderProjects(...todoList.projects.slice(1).map(createProjectElement));
// set Inbox how start project
if (todoList.today.id === appSettings.homeView) {
  setTodayProject();
} else {
  setProject(todoList.searchProjectById(appSettings.homeView));
}
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
