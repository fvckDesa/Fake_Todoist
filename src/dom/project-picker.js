import {
    projectPickerContainer,
    projectPicker,
    projectPickerList,
    projectPickerSearch,
    projectPickerArrow
} from "./elements";
import { createProjectElement, renderProjects } from "./project";
import todoList from "../module/todo-list";
import Icons from "../assets/svg";
import { getCurrentProject } from "./main-content";

let projectPick;

let submitCb;
let element;

window.addEventListener("resize", () => {
    if(projectPickerContainer.classList.contains("hidden")) return;
    positionProjectPicker(element);
});

projectPickerContainer.addEventListener("click", () => closeProjectPicker());

projectPicker.addEventListener("submit", (e) => {
    e.preventDefault();

    submitCb(projectPick);

    closeProjectPicker();
});

projectPicker.addEventListener("click", (e) => {
    e.stopPropagation();
});

projectPickerSearch.addEventListener("input", renderSearchProjectList);

function renderSearchProjectList() {
    const filter = projectPickerSearch.value.toLowerCase();
    renderProjectList(({ name }) => name.toLowerCase().includes(filter));
}

function activeProjectPicker(el, next = () => {}, project = getCurrentProject()) {
    // render project picker
    projectPickerContainer.classList.remove("hidden");

    projectPick = project;

    submitCb = next;
    element = el;

    // create list of projects
    renderProjectList();
    
    positionProjectPicker(el);
}

function closeProjectPicker() {
    // hide project picker
    projectPickerContainer.classList.add("hidden");
    // reset input
    projectPickerSearch.value = "";
}

function renderProjectList(filterCallback = () => true) {
    const projectItems = todoList.projects.filter(filterCallback).map(createPickerItem);
    if(projectItems.length === 0) projectItems.push(createProjectPickerEmpty());
    projectPickerList.replaceChildren(...projectItems);
}

function createPickerItem(project) {
    const { name, color } = project;
    const pickerItemContainer = document.createElement("li");
    pickerItemContainer.classList.add("project-picker-item-container");
    pickerItemContainer.innerHTML = `
        <button class="project-picker-item">
            <svg-loader src="${ color ? Icons.Circle : Icons.Inbox }" style="color: ${color}"></svg-loader>
            <span>${name}</span>
            <svg-loader src="${ Icons.ColorTic }" class="project-picker-item-tic"></svg-loader>
        </button>
    `;
    pickerItemContainer.addEventListener("click", () => {
        projectPick = project;
        // change current project
        projectPickerList.querySelector(".current")?.classList.remove("current");
        pickerItemContainer.firstElementChild.classList.add("current");
    });
    if( project === projectPick ) pickerItemContainer.firstElementChild.classList.add("current");
    return pickerItemContainer;
}

function createProjectPickerEmpty() {
    // create element
    const projectPickerEmpty = document.createElement("li");
    projectPickerEmpty.classList.add("project-picker-empty");
    projectPickerEmpty.innerHTML = `
        <span>No projects found</span>
        <div class="project-picker-item">
            <svg-loader src="${ Icons.Plus }"></svg-loader>
            <span>Create project "${projectPickerSearch.value}"</span>
        </div>
    `;
    // add event for creating project
    projectPickerEmpty.querySelector(".project-picker-item").addEventListener("click", () => {
        // create project
        const project = todoList.addProject(projectPickerSearch.value, "#808080");
        // render new project
        renderProjects(createProjectElement(project));
        renderSearchProjectList();
    });
    return projectPickerEmpty;
}

function positionProjectPicker(el) {
    const { x, y, startPos } = getProjectPickerPosition(el);
    startPos === "bottom" 
        ? projectPickerArrow.classList.add("reverse")
        : projectPickerArrow.classList.remove("reverse");
    
    projectPicker.style.cssText = `${startPos}: 0; transform: translate(${x}px, ${y}px);`;
}

function getProjectPickerPosition(element) {
    // get position of element who calls project picker
    const { left, bottom, top, width } = element.getBoundingClientRect();
    // get dimensions of body
    const { height: bodyHeight } = document.body.getBoundingClientRect();
    // get width of projectPicker
    const { width: projectPickerWidth, height: projectPickerHeight} = projectPicker.getBoundingClientRect();
    // distance from btn and projectPicker
    const surplusHeight = 12;
    // check if projectPicker is too high for the screen
    const isBottom = bottom + surplusHeight + projectPickerHeight < bodyHeight
    return {
        x: left - projectPickerWidth / 2 + width / 2,
        // if too height for the screen, show projectPicker on top
        y: isBottom ? bottom + surplusHeight : (bodyHeight - top + surplusHeight) * -1,
        startPos: isBottom ? "top" : "bottom"
    }
}

export {
    activeProjectPicker
};