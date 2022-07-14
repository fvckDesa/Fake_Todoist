import Icons from "../../assets/svg";
import {
  sidebarIcon,
  homeIcon,
  searchIcon,
  addIcon,
  inboxIcon,
  todayIcon,
  upcomingIcon,
  filtersLabelsIcon,
  arrowIcon,
  helpIcon,
  taskDueDate,
  taskProject
} from "./elements";
import format from "date-fns/format";

function setIcons() {
  sidebarIcon.src = Icons.CloseMenu;
  homeIcon.src = Icons.Home;
  searchIcon.src = Icons.Search;
  addIcon.src = Icons.Plus;
  inboxIcon.src = Icons.Inbox;
  todayIcon.src = Icons.Today;
  upcomingIcon.src = Icons.Upcoming;
  filtersLabelsIcon.src = Icons.FiltersLabels;
  arrowIcon.src = Icons.Arrow;
  helpIcon.src = Icons.Help;
  taskDueDate.querySelector(".task-btn-icon").src = Icons.DueDate;
  taskProject.querySelector(".task-btn-icon").src = Icons.Inbox;
}

export default setIcons;
