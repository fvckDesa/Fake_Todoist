import { projectTemplate, userProjects, sidebar, inboxProject } from "./elements";
import Icons from "../assets/svg";
import { setProject } from "./main-content";

inboxProject.addEventListener("click", () => projectClick("Inbox", inboxProject));

function createProjectElement({ name, color, tasks }) {
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
    projectEl.addEventListener("click", () => projectClick(name, projectEl));
    // return element
    return projectEl;
}

function projectClick(name, projectEl) {
    setProject(name);
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