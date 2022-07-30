import { taskTemplate } from "./elements";
import Icons from "../assets/svg";
import activeDueDatePicker from "./due-date-picker";
import activeTaskEditor from "./task-editor";
import { getDueDateInfo } from "../module/date-utilities";

function createTaskElement(task) {
    const { name, description, dueDate } = task;

    const taskEl = taskTemplate.cloneNode(true).firstElementChild;
    const [ checkboxBtn, content, actionContainer] = taskEl.children;
    const tic = checkboxBtn.querySelector("#tic-icon");
    const [ taskName, taskDescription, taskDueDate ] = content.children;
    const [ dueDateIcon, dueDateText ] = taskDueDate.children;
    const [ editTask, changeDueDate, comment, deleteTask ] = actionContainer.children;
    // set svg
    tic.setAttribute("src", Icons.TaskTic);
    dueDateIcon.setAttribute("src", Icons.DueDateXs);
    editTask.querySelector("svg-loader").setAttribute("src", Icons.EditTask);
    changeDueDate.querySelector("svg-loader").setAttribute("src", Icons.DueDateXl);
    comment.querySelector("svg-loader").setAttribute("src", Icons.Comment);
    deleteTask.querySelector("svg-loader").setAttribute("src", Icons.GarbageContainer);
    // set attributes
    name ? taskName.textContent = name : taskName.remove();
    description ? taskDescription.textContent = description : taskDescription.remove();

    const { text, color } = getDueDateInfo(dueDate);
    taskDueDate.style.color = `var(${color})`;
    dueDate ? dueDateText.textContent = text : taskDueDate.remove();
    // task actions
    editTask.addEventListener("click", () => activeTaskEditor(taskEl, task));
    changeDueDate.addEventListener("click", () => activeDueDatePicker(changeDueDate));

    return taskEl;
}

export {
    createTaskElement
}