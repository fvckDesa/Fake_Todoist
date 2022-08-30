import Icons from "../assets/icons";
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
  taskDueDate,
  pickerNoDateIcon,
  pickerTodayIcon,
  pickerTomorrowIcon,
  pickerWeekendIcon,
  pickerNextWeekIcon,
  pickerActionPreviousIcon,
  pickerActionNextIcon,
  pickerPreviewIcon,
  pickerCrossIcon,
  editProjectIcon,
  deleteProjectIcon,
  deleteWarningInfoIcon,
  deleteWarningCloseIcon,
  quickAddDueDateIcon,
  timePickerWarningIcon,
  showCompletedTasksIcon
} from "./elements";

function setIcons() {
  sidebarIcon.src = Icons.Close;
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
  pickerNoDateIcon.src = Icons.NoDate;
  pickerTodayIcon.src = Icons.Today;
  pickerTomorrowIcon.src = Icons.Tomorrow;
  pickerWeekendIcon.src = Icons.Weekend;
  pickerNextWeekIcon.src = Icons.NextWeek;
  pickerActionPreviousIcon.src = Icons.ArrowXl;
  pickerActionNextIcon.src = Icons.ArrowXl;
  pickerPreviewIcon.src = Icons.DueDateXl;
  pickerCrossIcon.src = Icons.Cross;
  editProjectIcon.src = Icons.Edit;
  deleteProjectIcon.src = Icons.GarbageContainer;
  deleteWarningInfoIcon.src = Icons.Info;
  deleteWarningCloseIcon.src = Icons.Close;
  quickAddDueDateIcon.src = Icons.DueDate;
  timePickerWarningIcon.src = Icons.Warning;
  showCompletedTasksIcon.src = Icons.ShowCompletedTasks;
  // set default icon on task editor
  taskDueDate.querySelector(".task-editor-btn-icon").setAttribute("src", Icons.DueDate);
}

export default setIcons;
