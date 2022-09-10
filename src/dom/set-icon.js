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
  taskDueDateIcon,
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
  infoPopUpInfoIcon,
  infoPopUpCloseIcon,
  quickAddDueDateIcon,
  timePickerWarningIcon,
  showCompletedTasksIcon,
  themeTopBarIcon,
  closeSettingsIcon,
  generalTopBarIcon,
  notFoundIllustration,
  exportProjectIcon,
  importProjectIcon,
  closeExportModal,
  csvIcon,
  jsonIcon,
  closeImportModal,
  prioritySelector1Flag,
  prioritySelector2Flag,
  prioritySelector3Flag,
  prioritySelector4Flag,
  prioritySelector1Tic,
  prioritySelector2Tic,
  prioritySelector3Tic,
  prioritySelector4Tic,
  quickAddPriorityIcon,
} from "./elements";

import NotFound from "../assets/illustrations/not-found.svg";

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
  taskDueDateIcon.src = Icons.DueDate;
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
  infoPopUpInfoIcon.src = Icons.Info;
  infoPopUpCloseIcon.src = Icons.Close;
  quickAddDueDateIcon.src = Icons.DueDate;
  timePickerWarningIcon.src = Icons.Warning;
  showCompletedTasksIcon.src = Icons.ShowCompletedTasks;
  themeTopBarIcon.src = Icons.Theme;
  closeSettingsIcon.src = Icons.Close;
  generalTopBarIcon.src = Icons.General;
  notFoundIllustration.src = NotFound;
  exportProjectIcon.src = Icons.Export;
  importProjectIcon.src = Icons.Import;
  closeExportModal.src = Icons.Close;
  csvIcon.src = Icons.File;
  jsonIcon.src = Icons.File;
  closeImportModal.src = Icons.Close;
  prioritySelector1Flag.src = Icons.LinearFlag;
  prioritySelector2Flag.src = Icons.LinearFlag;
  prioritySelector3Flag.src = Icons.LinearFlag;
  prioritySelector4Flag.src = Icons.OutLineFlag;
  prioritySelector1Tic.src = Icons.ColorTic;
  prioritySelector2Tic.src = Icons.ColorTic;
  prioritySelector3Tic.src = Icons.ColorTic;
  prioritySelector4Tic.src = Icons.ColorTic;
  quickAddPriorityIcon.src = Icons.OutLineFlag;
}

export default setIcons;
