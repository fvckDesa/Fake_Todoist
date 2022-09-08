import Icons from "../assets/icons";
import { taskSectionTemplate } from "./elements";
import { addTask, createTaskElement } from "./task";
import activeTaskEditor from "./task-editor";

export function createTaskSection({ title = "", tasks = [] }) {
    const taskSection = taskSectionTemplate.cloneNode(true).firstElementChild;
    const [ header, taskList, completedTaskList ] = taskSection.children;
    const [ addTaskBtn ] = taskList.children;

    addTaskBtn.querySelector(".add-task-icon").src = Icons.PlusBold;

    header.firstElementChild.textContent = title;

    taskList.replaceChildren(
        ...tasks.filter((task) => !task.complete).map(createTaskElement),
        addTaskBtn
    );

    completedTaskList.replaceChildren(
        ...tasks.filter((task) => task.complete).map(createTaskElement),
    );

    addTaskBtn.addEventListener("click", () => {
        activeTaskEditor(addTaskBtn, null, addTask);
    });

    return taskSection;
}