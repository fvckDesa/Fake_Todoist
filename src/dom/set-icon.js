import Icons from "../assets/svg";
import {
  sidebarIcon,
  homeIcon,
  searchIcon,
  topBarAddIcon,
  inboxIcon,
  todayIcon,
  upcomingIcon,
  filtersLabelsIcon,
  arrowIcon,
  helpIcon,
  openProjectIcon,
  addTaskIcon,
  taskDueDate,
  taskProject
} from "./elements";

function setIcons() {
  sidebarIcon.src = Icons.CloseMenu;
  homeIcon.src = Icons.Home;
  searchIcon.src = Icons.Search;
  topBarAddIcon.src = Icons.Plus;
  inboxIcon.src = Icons.Inbox;
  todayIcon.src = Icons.Today;
  upcomingIcon.src = Icons.Upcoming;
  filtersLabelsIcon.src = Icons.FiltersLabels;
  arrowIcon.src = Icons.Arrow;
  helpIcon.src = Icons.Help;
  openProjectIcon.src = Icons.PlusBold;
  addTaskIcon.src =  Icons.PlusBold;
  // set default icon on task editor
  taskDueDate.querySelector(".task-editor-btn-icon").setAttribute("src", Icons.DueDate);
  taskProject.querySelector(".task-editor-btn-icon").setAttribute("src", Icons.Inbox);
}

export default setIcons;
