import { sidebar, sidebarBtn, sidebarIcon, userProjects, arrowIcon } from "./elements";
import Icons from "../../assets";

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    sidebarIcon.src = sidebar.classList.contains("open") ? Icons.CloseMenu : Icons.HamburgerMenu;
});

arrowIcon.addEventListener("click", () => {
    userProjects.classList.toggle("close");
    arrowIcon.classList.toggle("rotate");
});

function activeSidebar() {}

export default activeSidebar;