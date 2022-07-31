import { projectTemplate, userProjects, sidebar } from "./elements";
import Icons from "../assets/svg";
import { setProject } from "./main-content";

function createProjectElement(project) {
    const { name, color, id, tasks } = project;
    // copy element
    const projectEl = projectTemplate.cloneNode(true).firstElementChild;
    const [projectIcon, projectName, projectNum] = projectEl.children;
    // set parameters
    projectName.textContent = name;
    projectIcon.setAttribute("src", Icons.Circle);
    projectIcon.style.color = color;
    projectNum.setAttribute("data-num", tasks.length);
    projectNum.textContent = tasks.length;
    // set project click event
    projectEl.addEventListener("click", () => projectClick(project, projectEl));
    // return element
    return projectEl;
}

function projectClick(project, projectEl) {
    setProject(project);
    // change current project on sidebar
    sidebar.querySelector(".project.current").classList.remove("current");
    projectEl.classList.add("current");
}

function renderProjects(...projects) {
    for(const project of projects) {
        userProjects.appendChild(project);
    }
}

export {
    createProjectElement,
    renderProjects,
    projectClick
}