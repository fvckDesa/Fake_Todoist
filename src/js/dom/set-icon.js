import Icons from "../../assets";
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
  addBlackIcon
} from "./elements";

function setIcons() {
  sidebarIcon.src = Icons.HamburgerMenu;
  homeIcon.src = Icons.Home;
  searchIcon.src = Icons.Search;
  addIcon.src = Icons.Plus;
  inboxIcon.src = Icons.Inbox;
  todayIcon.src = Icons.Today;
  upcomingIcon.src = Icons.Upcoming;
  filtersLabelsIcon.src = Icons.FiltersLabels;
  arrowIcon.src = Icons.Arrow;
  addBlackIcon.src = Icons.PlusBlack;
}

export default setIcons;
