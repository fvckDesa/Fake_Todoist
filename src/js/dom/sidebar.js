import {
  sidebar,
  sidebarBtn,
  sidebarIcon,
  userProjects,
  arrowIcon,
  mainContent,
  openProjectForm,
  projectFormContainer,
} from "./elements";
import Icons from "../../assets/svg";
import { formatTaskDescription } from "./task-editor";

sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  mainContent.classList.toggle("reduced");
  console.log(mainContent.scrollWidth)
  formatTaskDescription();

  sidebarIcon.src = sidebar.classList.contains("open")
    ? Icons.CloseMenu
    : Icons.HamburgerMenu;
});

arrowIcon.addEventListener("click", () => {
  userProjects.classList.toggle("close");
  arrowIcon.classList.toggle("rotate");
});

openProjectForm.addEventListener("click", () => {
    projectFormContainer.classList.remove("hidden");
});

function activeSidebar() {}

export default activeSidebar;
