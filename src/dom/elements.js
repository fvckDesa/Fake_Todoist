//Top Bar icons
export const sidebarIcon = document.querySelector('#sidebar-icon');
export const homeIcon = document.querySelector('#home-icon');
export const searchIcon = document.querySelector('#search-icon');
export const topBarAddIcon = document.querySelector('#top-bar-add-icon');
export const themeTopBarIcon = document.querySelector("#top-bar-theme-icon");
export const generalTopBarIcon = document.querySelector("#top-bar-general-icon");
//Side Bar icons
export const inboxIcon = document.querySelector('#inbox-icon');
export const todayIcon = document.querySelector('#today-icon'); 
export const upcomingIcon = document.querySelector('#upcoming-icon'); 
export const filtersLabelsIcon = document.querySelector('#filters-labels-icon');
export const arrowIcon = document.querySelector('#arrow-icon');
export const openProjectIcon = document.querySelector('#open-project-icon');
//Project form icons
export const helpIcon = document.querySelector('#help-icon');
//Main content icons
export const editProjectIcon = document.querySelector('#edit-project-icon');
export const deleteProjectIcon = document.querySelector('#delete-project-icon');
export const showCompletedTasksIcon = document.querySelector('#show-completed-tasks-icon');
export const notFoundIllustration = document.querySelector(".not-found-illustration");
export const exportProjectIcon = document.querySelector("#export-project-icon");
export const importProjectIcon = document.querySelector("#import-project-icon");
//Due Date Picker icons
export const pickerTodayIcon = document.querySelector("#date-suggestions-icon-today");
export const pickerTomorrowIcon = document.querySelector("#date-suggestions-icon-tomorrow");
export const pickerWeekendIcon = document.querySelector("#date-suggestions-icon-weekend");
export const pickerNextWeekIcon = document.querySelector("#date-suggestions-icon-next-week");
export const pickerNoDateIcon = document.querySelector("#date-suggestions-icon-no-date");
export const pickerActionPreviousIcon = document.querySelector("#previous-icon");
export const pickerActionNextIcon = document.querySelector("#next-icon");
export const pickerPreviewIcon = document.querySelector(".date-preview-content-icon");
export const pickerCrossIcon = document.querySelector("#cross-icon");
//Time Picker icons
export const timePickerWarningIcon = document.querySelector(".warning-icon");
//Delete Warning icons
export const infoPopUpInfoIcon = document.querySelector("#pop-up-info-icon");
export const infoPopUpCloseIcon = document.querySelector("#pop-up-close-icon");
//Quick Add icons
export const quickAddDueDateIcon = document.querySelector(".quick-add .task-editor-btn-icon");
//Settings icons
export const closeSettingsIcon = document.querySelector("#close-settings-icon");
//Export project icons
export const closeExportModal = document.querySelector("#close-export-modal-icon");
export const csvIcon = document.querySelector("#csv-icon");
export const jsonIcon = document.querySelector("#json-icon");
//Import project icons
export const closeImportModal = document.querySelector("#close-import-modal-icon");
//Top Bar elements
export const topbar = document.querySelector('.top-bar');
export const sidebarBtn = document.querySelector('.sidebar-btn');
export const searchBar = document.querySelector('.search-bar');
export const searchInput = document.querySelector('#search-input');
export const quickAddBtn = document.querySelector('.quick-add-btn');
export const homeBtn = document.querySelector(".home-btn");
export const themeBtn = document.querySelector(".theme-btn");
export const generalBtn = document.querySelector(".general-btn");
//Side Bar elements
export const sidebar = document.querySelector('.side-bar');
export const inboxProject = document.querySelector("#inbox-project");
export const todayProject = document.querySelector("#today-project");
export const userProjects = document.querySelector('#user-projects');
export const projectHeader = document.querySelector('.project-header');
export const openProjectForm = document.querySelector('#open-project-form');
//Main Content elements
export const mainContent = document.querySelector('.main-content');
export const mainHeader = document.querySelector('.main-header');
export const mainTitle = document.querySelector(".main-header .title");
export const editProjectBtn = document.querySelector('#edit-project');
export const deleteProjectBtn = document.querySelector('#delete-project');
export const showCompletedTasksBtn = document.querySelector('#show-completed-tasks');
export const emptyProject = document.querySelector('.empty-project');
export const emptyProjectIllustration = document.querySelector('.empty-project-illustration');
export const taskSectionList = document.querySelector('.task-section-list');
export const overdueTaskSection = document.querySelector(".task-section.overdue")
export const overdueTaskContainer = document.querySelector("#overdue-task-list");
export const rescheduleBtn = document.querySelector(".reschedule-btn");
export const notFound = document.querySelector(".not-found");
export const notFoundBackHomeView = document.querySelector(".not-found > button");
export const exportProjectBtn = document.querySelector("#export-project");
export const importProjectBtn = document.querySelector("#import-project");
//Task Editor elements
export const taskEditor = document.querySelector("#task-editor-template").content.cloneNode(true).firstElementChild;
export const taskNameInput = taskEditor.querySelector('#task-editor .task-name-input');
export const taskDescriptionInput = taskEditor.querySelector('#task-editor .task-description-input');
export const taskDueDate = taskEditor.querySelector('#task-editor #task-due-date');
export const taskProject = taskEditor.querySelector('#task-editor #project-btn');
export const taskEditorCancel = taskEditor.querySelector('#task-editor .cancel-btn');
export const taskEditorSubmit = taskEditor.querySelector('#task-editor .submit-btn');
//Project Picker elements
export const projectPickerContainer = document.querySelector(".project-picker-container");
export const projectPicker = document.querySelector(".project-picker");
export const projectPickerList = document.querySelector(".project-picker-list");
export const projectPickerSearch = document.querySelector(".project-picker-search");
export const projectPickerArrow = document.querySelector(".project-picker-arrow");
//Due Date Picker elements
export const dueDatePickerContainer = document.querySelector(".due-date-picker-container");
export const dueDatePicker = document.querySelector(".due-date-picker");
export const dueDatePickerHeaderMonth = document.querySelector(".date-picker-header-month");
export const dueDatePickerActionPrev = document.querySelector(".date-picker-header-action#previous");
export const dueDatePickerActionCurr = document.querySelector(".date-picker-header-action#current");
export const dueDatePickerActionNext = document.querySelector(".date-picker-header-action#next");
export const dueDatePickerMonthList = document.querySelector(".date-picker-month-list");
export const dueDatePickerSuggestionToday = document.querySelector("#suggestions-today");
export const dueDatePickerSuggestionTomorrow = document.querySelector("#suggestions-tomorrow");
export const dueDatePickerSuggestionThisWeekend = document.querySelector("#suggestions-this-weekend");
export const dueDatePickerSuggestionNextWeek = document.querySelector("#suggestions-next-week");
export const dueDatePickerSuggestionNoDate = document.querySelector("#suggestions-no-date");
export const dueDatePickerInput = document.querySelector(".date-input > input");
export const dueDatePickerPreview = document.querySelector(".date-preview");
export const dueDatePickerPreviewDate = document.querySelector(".date-preview-content-date");
export const dueDatePickerMonthListHeader = document.querySelector(".date-picker-month-list-header");
export const dueDatePickerTaskCounter = document.querySelector(".task-counter");
export const dueDatePickerActions = document.querySelector(".date-actions");
export const dueDatePickerAddTime = document.querySelector(".date-actions-add-time");
export const dueDatePickerSave = document.querySelector(".date-actions-save");
export const dueDatePickerWeekDayList = document.querySelector(".date-picker-week-day-list");
//Time picker elements
export const timePickerContainer = document.querySelector(".time-picker-container");
export const timePicker = document.querySelector(".time-picker");
export const timePickerInput = document.querySelector(".time-picker-input");
export const timePickerSubmit = document.querySelector(".time-picker-footer > button[type=\"submit\"]");
//Project form elements
export const projectFormContainer = document.querySelector('.project-form-container');
export const projectForm = document.querySelector('.project-form');
export const colorSelector = document.querySelector('#color-selector');
export const colorList = document.querySelector('.color-list');
export const nameProjectInput = document.querySelector('#name-project-input');
export const cancelProjectBtn = document.querySelector('#cancel-project-btn');
export const addProjectBtn = document.querySelector('#add-project-btn');
//Templates
export const projectTemplate = document.querySelector('#project-template').content;
export const taskTemplate = document.querySelector('#task-template').content;
export const taskSectionTemplate = document.querySelector('#task-section-template').content;
export const themePageTemplate = document.querySelector('#theme-page-template').content;
export const generalPageTemplate = document.querySelector("#general-page-template").content;
//Loading screen
export const loadScreen = document.querySelector(".load-screen");
//Info pop up
export const infoPopUpContainer = document.querySelector(".info-pop-up-container");
export const infoPopUp = document.querySelector(".info-pop-up");
export const infoPopUpTitle = document.querySelector(".pop-up-title");
export const infoPopUpText = document.querySelector(".pop-up-text");
export const infoPopUpSubmit = document.querySelector("#pop-up-submit");
//Quick add
export const quickAddContainer = document.querySelector(".quick-add-container");
export const quickAdd = document.querySelector(".quick-add");
export const quickAddNameInput = document.querySelector(".quick-add .task-name-input");
export const quickAddDescriptionInput = document.querySelector(".quick-add .task-description-input");
export const quickAddDueDate = document.querySelector(".quick-add #task-due-date");
export const quickAddProject = document.querySelector(".quick-add #task-project");
export const quickAddSubmitBtn = document.querySelector(".quick-add .submit-btn");
//Settings
export const settingsContainer = document.querySelector(".settings-container");
export const settings = document.querySelector(".settings");
export const settingsList = document.querySelector(".settings-list");
export const setting = document.querySelector(".setting");
export const settingName = document.querySelector(".setting-header > h2");
export const settingContent = document.querySelector(".setting-content");
export const settingFooter = document.querySelector(".setting-footer");
export const closeSettingsBtn = document.querySelector(".close-settings");
//Export project
export const exportProjectContainer = document.querySelector(".export-project-container");
export const exportProject = document.querySelector(".export-project");
export const closeExportProject = document.querySelector(".close-export-modal");
export const exportCSV = document.querySelector("#export-csv");
export const exportJSON = document.querySelector("#export-json");
//Import project
export const importProjectContainer = document.querySelector(".import-project-container");
export const importProject = document.querySelector(".import-project");
export const closeImportProject = document.querySelector(".close-import-modal");
export const importProjectDragAndDropArea = document.querySelector(".drag-and-drop-area");
export const importProjectInput = document.querySelector("#import-input");
//Drag over screen
export const dragOverScreen = document.querySelector(".drag-over-screen");