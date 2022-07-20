import { taskTemplate } from "./elements";
import Icons from "../assets/svg"

function createTaskElement({ name, description, dueDate }) {
    const taskEl = taskTemplate.cloneNode(true).firstElementChild;
    const [ checkboxBtn, content, actionContainer] = taskEl.children;
    const tic = checkboxBtn.querySelector("#tic-icon");
    const [ taskName, taskDescription, taskDueDate ] = content.children;

    tic.setAttribute("src", Icons.tic);

    name ? taskName.textContent = name : taskName.remove();
    description ? taskDescription.textContent = description : taskDescription.remove();
    dueDate ? taskDueDate.textContent = dueDate : taskDueDate.remove();

    return taskEl;
}

export {
    createTaskElement
}