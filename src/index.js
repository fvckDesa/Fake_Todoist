import './style.css';
import './styles/topbar.css';
import './styles/sidebar.css';
import './styles/main.css';
import './styles/todo.css';

import Project from "./module/project";
import { moveSideBar, addProject } from './module/function';

 export const projects = [];

const menu = document.querySelector(".menu-icon");
menu.addEventListener("click", moveSideBar);

const addProjectBtn = document.querySelector(".add-project");
addProjectBtn.addEventListener("click", () => {
    document.querySelector(".add-project-form").classList.remove("hidden");

});
