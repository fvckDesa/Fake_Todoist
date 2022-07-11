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
  addBlackIcon,
  helpIcon,
  taskDueDate,
  taskProject
} from "./elements";

function setIcons() {
  sidebarIcon.src = Icons.CloseMenu;
  homeIcon.src = Icons.Home;
  searchIcon.src = Icons.Search;
  addIcon.src = Icons.Plus;
  inboxIcon.src = Icons.Inbox;
  //add svg directly to the img for change day in svg
  todayIcon.parentElement.replaceChild(Icons.Today, todayIcon);
  upcomingIcon.src = Icons.Upcoming;
  filtersLabelsIcon.src = Icons.FiltersLabels;
  arrowIcon.src = Icons.Arrow;
  addBlackIcon.src = Icons.PlusBlack;
  helpIcon.src = Icons.Help;
  taskDueDate.querySelector(".task-btn-icon").src = Icons.DueDate;
  taskProject.querySelector(".task-btn-icon").src = Icons.Inbox;
}

export default setIcons;
