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
//Top Bar elements
export const topbar = document.querySelector('.top-bar');
export const sidebarBtn = document.querySelector('.sidebar-btn');
export const searchBar = document.querySelector('.search-bar');
export const searchInput = document.querySelector('#search-input');
//Side Bar elements
export const sidebar = document.querySelector('.side-bar');
export const inboxProject = document.querySelector("#inbox-project");
export const userProjects = document.querySelector('#user-projects');
export const openProjectForm = document.querySelector('#open-project-form');
//Main Content elements
export const mainContent = document.querySelector('.main-content');
export const mainHeader = document.querySelector('.main-header');
export const mainTitle = document.querySelector(".main-header .title");
export const taskContainer = document.querySelector('#task-container');
export const completedTaskContainer = document.querySelector('#completed-task-container');
export const addTask = document.querySelector('.add-task');
//Task Editor elements
export const taskEditor = document.querySelector("#task-editor-template").content.cloneNode(true).firstElementChild;
export const taskNameInput = taskEditor.querySelector('#task-name-input');
export const taskDescriptionInput = taskEditor.querySelector('#task-description-input');
export const taskDueDate = taskEditor.querySelector('#task-due-date');
export const taskProject = taskEditor.querySelector('#task-project');
export const taskEditorCancel = taskEditor.querySelector('#cancel-btn');
export const taskEditorSubmit = taskEditor.querySelector('#submit-btn');
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
// loading screen
export const loadScreen = document.querySelector(".load-screen");