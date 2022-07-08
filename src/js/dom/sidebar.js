import { sidebar, sidebarBtn, sidebarIcon } from "./elements";
import Icons from "../../assets";

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    sidebarIcon.src = sidebar.classList.contains("open") ? Icons.CloseMenu : Icons.HamburgerMenu;
});

function activeSidebar() {}

export default activeSidebar;