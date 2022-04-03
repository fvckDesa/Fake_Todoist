import Project from "./project";
import { projects } from "../index";

export function moveSideBar() {
    const sideBar = document.querySelector(".sidebar");
    const main = document.querySelector("main");

    sideBar.classList.toggle("hide");
    main.classList.toggle("translate");
}

export function addProject() {
    const project = new Project("prova");
    project.render(document.querySelector(".user-container"));
    projects.push(project);
    console.log(projects);
}