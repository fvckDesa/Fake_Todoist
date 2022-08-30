import { projectTemplate, userProjects, todayProject } from "./elements";
import Icons from "../assets/icons";
import { setProject } from "./main-content";
import { changeProject } from "./sidebar";
import todoList from "../module/todo-list";
import { overdueFilter } from "../utils/filters";

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
    projectEl.addEventListener("click", () => {
        setProject(project);
        changeProject(id);
    });
    // return element
    return projectEl;
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
    changeTodayNumTask();
}

function changeTodayNumTask() {
    let hasOverdueTask = false;
    const num = todoList.today.filterTask(task => {
        if(!task.complete && overdueFilter(task)) hasOverdueTask = true;
        return !task.complete;
    }).length;
    todayProject.lastElementChild.dataset.num = num;
    todayProject.lastElementChild.classList.toggle("has-overdue", hasOverdueTask);
}

export {
    createProjectElement,
    renderProjects,
    updateProject,
    deleteProject,
    changeNumTask
}