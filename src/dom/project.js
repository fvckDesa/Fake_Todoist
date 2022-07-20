import { projectTemplate, userProjects, sidebar } from "./elements";
import Icons from "../assets/svg";
import { setProject } from "./main-content";

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
    projectEl.addEventListener("click", () => {
        setProject(name);
        // change current project on sidebar
        sidebar.querySelector(".project.current").classList.remove("current");
        projectEl.classList.add("current");
    });
    // return element
    return projectEl;
}

function setProjects(...projects) {
    for(const project of projects) {
        userProjects.appendChild(project);
    }
}

export {
    createProjectElement,
    setProjects
}