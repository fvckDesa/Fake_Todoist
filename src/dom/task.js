import { taskTemplate } from "./elements";
import Icons from "../assets/svg";
import { activeDueDatePicker } from "./due-date-picker";

function createTaskElement({ name, description, dueDate }) {
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
    dueDate ? dueDateText.textContent = dueDate : taskDueDate.remove();
    
    changeDueDate.addEventListener("click", () => activeDueDatePicker(changeDueDate));

    return taskEl;
}

export {
    createTaskElement
}