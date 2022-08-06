//Top Bar icons
export const sidebarIcon = document.querySelector('#sidebar-icon');
export const homeIcon = document.querySelector('#home-icon');
export const searchIcon = document.querySelector('#search-icon');
export const topBarAddIcon = document.querySelector('#top-bar-add-icon');
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
export const addTaskIcon = document.querySelector('#add-task-icon');
export const editProjectIcon = document.querySelector('#edit-project-icon');
export const deleteProjectIcon = document.querySelector('#delete-project-icon');
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
export const deleteWarningInfoIcon = document.querySelector("#delete-warning-info-icon");
export const deleteWarningCloseIcon = document.querySelector("#delete-warning-close-icon");
//Quick Add icons
export const quickAddDueDateIcon = document.querySelector(".quick-add .task-editor-btn-icon");
//Top Bar elements
export const topbar = document.querySelector('.top-bar');
export const sidebarBtn = document.querySelector('.sidebar-btn');
export const searchBar = document.querySelector('.search-bar');
export const searchInput = document.querySelector('#search-input');
export const quickAddBtn = document.querySelector('.quick-add-btn');
//Side Bar elements
export const sidebar = document.querySelector('.side-bar');
export const inboxProject = document.querySelector("#inbox-project");
export const userProjects = document.querySelector('#user-projects');
export const projectHeader = document.querySelector('.project-header');
export const openProjectForm = document.querySelector('#open-project-form');
//Main Content elements
export const mainContent = document.querySelector('.main-content');
export const mainHeader = document.querySelector('.main-header');
export const mainTitle = document.querySelector(".main-header .title");
export const taskContainer = document.querySelector('#task-container');
export const completedTaskContainer = document.querySelector('#completed-task-container');
export const addTaskBtn = document.querySelector('.add-task');
export const editProjectBtn = document.querySelector('#edit-project');
export const deleteProjectBtn = document.querySelector('#delete-project');
//Task Editor elements
export const taskEditor = document.querySelector("#task-editor-template").content.cloneNode(true).firstElementChild;
export const taskNameInput = taskEditor.querySelector('#task-editor .task-name-input');
export const taskDescriptionInput = taskEditor.querySelector('#task-editor .task-description-input');
export const taskDueDate = taskEditor.querySelector('#task-editor .task-due-date');
export const taskProject = taskEditor.querySelector('#task-editor .task-project');
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
//Loading screen
export const loadScreen = document.querySelector(".load-screen");
//Delete warning
export const deleteWarningContainer = document.querySelector(".delete-warning-container");
export const deleteWarning = document.querySelector(".delete-warning");
export const deleteWarningName = document.querySelector(".delete-warning-name");
//Quick add
export const quickAddContainer = document.querySelector(".quick-add-container");
export const quickAdd = document.querySelector(".quick-add");
export const quickAddNameInput = document.querySelector(".quick-add .task-name-input");
export const quickAddDescriptionInput = document.querySelector(".quick-add .task-description-input");
export const quickAddDueDate = document.querySelector(".quick-add .task-due-date");
export const quickAddProject = document.querySelector(".quick-add .task-project");
export const quickAddSubmitBtn = document.querySelector(".quick-add .submit-btn");