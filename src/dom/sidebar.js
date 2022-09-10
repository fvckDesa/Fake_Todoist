import {
  sidebar,
  sidebarBtn,
  sidebarIcon,
  userProjects,
  arrowIcon,
  mainContent,
  openProjectForm,
  projectHeader
} from "./elements";
import Icons from "../assets/icons";
import activeProjectForm from "./project-form";
import todoList from "../module/todo-list";
import { renderProjects, createProjectElement } from "./project";

sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  mainContent.classList.toggle("reduced");

  sidebarIcon.src = sidebar.classList.contains("open")
    ? Icons.Close
    : Icons.HamburgerMenu;
});

projectHeader.addEventListener("click", () => {
  userProjects.classList.toggle("close");
  arrowIcon.classList.toggle("rotate");
});

openProjectForm.addEventListener("click", (e) => {
  e.stopPropagation();

  activeProjectForm(null, (name, color) => {
    const newProject = todoList.addProject(name, color);
    renderProjects(createProjectElement(newProject));
    document.querySelector(`[data-id="${newProject.id}"]`).click();
  });
});

export function changeProject(id) {
  // change current project on sidebar
  sidebar.querySelector(".project.current")?.classList.remove("current");
  sidebar.querySelector(`[data-id="${id}"]`).classList.add("current");
}
