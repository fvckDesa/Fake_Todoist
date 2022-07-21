import {
    projectPickerContainer,
    projectPicker,
    projectPickerList,
    projectPickerSearch,
    taskProject
} from "./elements";
import { getCurrentProject } from "./main-content";
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

projectPickerSearch.addEventListener("input", () => {
    const filter = projectPickerSearch.value.toLowerCase();
    renderProjectList(({ name }) => name.toLowerCase().includes(filter));
});

function activeProjectPicker() {
    // render project picker
    projectPickerContainer.classList.remove("hidden");
    // set in correct position
    const { x, y } = getProjectPickerPosition();
    projectPicker.style.cssText = `transform: translate(${x}px, ${y}px)`;
    // create list of projects
    renderProjectList();
}

function renderProjectList(filterCallback = () => true) {
    projectPickerList.replaceChildren(
        ...todoList.projects.filter(filterCallback).map(createPickerItem)
    );
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
    });
    if( project === projectPick ) pickerItem.classList.add("current");
    return pickerItem;
}

function getProjectPickerPosition() {
    // get position of taskProject on the screen
    const { left, bottom, width } = taskProject.getBoundingClientRect();
    // get width of projectPicker
    const projectPickerWidth = parseInt(getComputedStyle(projectPicker).getPropertyValue("width"));
    // distance from btn and projectPicker
    const surplusHeight = 12;
    return {
        x: left - projectPickerWidth / 2 + width / 2,
        y: bottom + surplusHeight
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