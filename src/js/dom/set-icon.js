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
  helpIcon
} from "./elements";

function setIcons() {
  sidebarIcon.src = Icons.HamburgerMenu;
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
}

export default setIcons;
