import { projectTemplate, userProjects, sidebar } from "./elements";
import Icons from "../assets/icons";
import { setProject } from "./main-content";

function createProjectElement(project) {
    const { name, color, id, tasks } = project;
    // copy element
    const projectEl = projectTemplate.cloneNode(true).firstElementChild;
    projectEl.setAttribute("data-id", id);
    const [projectIcon, projectName, projectNum] = projectEl.children;
    // set parameters
    projectName.textContent = name;
    projectIcon.setAttribute("src", Icons.Circle);
    projectIcon.style.color = color;
    projectNum.setAttribute("data-num", tasks.filter(({complete}) => !complete).length);
    // set project click event
    projectEl.addEventListener("click", () => projectClick(project, projectEl));
    // return element
    return projectEl;
}

function projectClick(project, projectEl) {
    setProject(project);
    // change current project on sidebar
    sidebar.querySelector(".project.current")?.classList.remove("current");
    projectEl.classList.add("current");
}

function renderProjects(...projects) {
    for(const project of projects) {
        userProjects.appendChild(project);
    }
}

function updateProject(project) {
    const projectEl = userProjects.querySelector(`[data-id="${project.id}"]`);
    projectEl.replaceWith(createProjectElement(project));
}

function deleteProject(id) {
    const projectEl = userProjects.querySelector(`[data-id="${id}"]`);
    projectEl.remove();
}

function changeNumTask(project) {
    const projectEl = document.querySelector(`[data-id="${project.id}"]`);
    projectEl.lastElementChild.dataset.num = project.tasks.filter(({complete}) => !complete).length;
}

export {
    createProjectElement,
    renderProjects,
    projectClick,
    updateProject,
    deleteProject,
    changeNumTask
}