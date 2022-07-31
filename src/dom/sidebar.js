import {
  sidebar,
  sidebarBtn,
  sidebarIcon,
  userProjects,
  arrowIcon,
  mainContent,
  openProjectForm,
  nameProjectInput,
  projectFormContainer,
  projectHeader
} from "./elements";
import Icons from "../assets/svg";
import { formatTaskDescription } from "./task-editor";

sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  mainContent.classList.toggle("reduced");
  formatTaskDescription();

  sidebarIcon.src = sidebar.classList.contains("open")
    ? Icons.CloseMenu
    : Icons.HamburgerMenu;
});

projectHeader.addEventListener("click", () => {
  userProjects.classList.toggle("close");
  arrowIcon.classList.toggle("rotate");
});

openProjectForm.addEventListener("click", (e) => {
  e.stopPropagation();

  projectFormContainer.classList.remove("hidden");
  nameProjectInput.focus();
});
