import {
    projectPickerContainer,
    projectPicker,
    projectPickerList,
    projectPickerSearch,
    projectPickerArrow
} from "./elements";
import { createProjectElement, renderProjects } from "./project";
import { setTaskProject } from "./task-editor";
import todoList from "../module/todo-list";
import Icons from "../assets/svg";

let projectPick;

projectPickerContainer.addEventListener("click", () => {
    projectPickerContainer.classList.add("hidden");
    // reset input
    projectPickerSearch.value = "";
});

projectPicker.addEventListener("click", (e) => {
    e.stopPropagation();
});

projectPickerSearch.addEventListener("input", renderSearchProjectList);

function renderSearchProjectList() {
    const filter = projectPickerSearch.value.toLowerCase();
    renderProjectList(({ name }) => name.toLowerCase().includes(filter));
}

function activeProjectPicker(el) {
    // render project picker
    projectPickerContainer.classList.remove("hidden");
    // create list of projects
    renderProjectList();
    // set in correct position
    const { x, y, startPos } = getProjectPickerPosition(el);
    startPos === "bottom" 
        ? projectPickerArrow.classList.add("reverse")
        : projectPickerArrow.classList.remove("reverse");
    
    projectPicker.style.cssText = `${startPos}: 0; transform: translate(${x}px, ${y}px);`;
}

function renderProjectList(filterCallback = () => true) {
    const projectItems = todoList.projects.filter(filterCallback).map(createPickerItem);
    if(projectItems.length === 0) projectItems.push(createProjectPickerEmpty());
    projectPickerList.replaceChildren(...projectItems);
}

function createPickerItem(project) {
    const { name, color } = project;
    const pickerItem = document.createElement("li");
    pickerItem.classList.add("project-picker-item");
    pickerItem.innerHTML = `
        <svg-loader src="${ color ? Icons.Circle : Icons.Inbox }" style="color: ${color}"></svg-loader>
        <span>${name}</span>
        <svg-loader src="${ Icons.ColorTic }" class="project-picker-item-tic"></svg-loader>
    `;
    pickerItem.addEventListener("click", () => {
        projectPick = project;
        // change taskProject
        setTaskProject(project);
        // hide project picker
        projectPickerContainer.classList.add("hidden");
        // change current project
        projectPickerList.querySelector(".current")?.classList.remove("current");
        pickerItem.classList.add("current");
        // reset input
        projectPickerSearch.value = "";
    });
    if( project === projectPick ) pickerItem.classList.add("current");
    return pickerItem;
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

function setProjectPick(project) {
    projectPick = project;
}

function getProjectPick() {
    return projectPick;
}

export {
    activeProjectPicker,
    setProjectPick,
    getProjectPick
};