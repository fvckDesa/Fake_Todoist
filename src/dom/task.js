import { taskTemplate } from "./elements";
import Icons from "../assets/svg";
import activeDueDatePicker from "./due-date-picker";
import activeTaskEditor from "./task-editor";
import { getDueDateInfo } from "../utilities/date-utilities";
import todoList from "../module/todo-list";
import { toggleTask } from "./main-content";
import activeDeleteWarning from "./delete-warning";
import { changeNumTask } from "./project";
import { updateTask } from "../utilities/dom-utilities";

function createTaskElement(task) {
    const { name, description, id } = task;
    const project = todoList.taskProject(id);
    let { dueDate, complete } = task;

    const taskEl = taskTemplate.cloneNode(true).firstElementChild;
    const [ checkboxBtn, content, actionContainer] = taskEl.children;
    const tic = checkboxBtn.querySelector("#tic-icon");
    const [ taskName, taskDescription, taskDueDate ] = content.children;
    const [ dueDateIcon, dueDateText ] = taskDueDate.children;
    const [ editTask, changeDueDate, comment, deleteTask ] = actionContainer.children;
    // set svg
    tic.setAttribute("src", Icons.TaskTic);
    dueDateIcon.setAttribute("src", Icons.DueDateXs);
    editTask.querySelector("svg-loader").setAttribute("src", Icons.Edit);
    changeDueDate.querySelector("svg-loader").setAttribute("src", Icons.DueDateXl);
    comment.querySelector("svg-loader").setAttribute("src", Icons.Comment);
    deleteTask.querySelector("svg-loader").setAttribute("src", Icons.GarbageContainer);
    // set attributes
    name ? taskName.textContent = name : taskName.remove();
    description ? taskDescription.textContent = description : taskDescription.remove();

    const { text, color } = getDueDateInfo(dueDate);
    taskDueDate.style.color = `var(${color})`;
    dueDate ? dueDateText.textContent = text : taskDueDate.remove();
    // events
    const changeDueDateEvent = (date) => {
        dueDate = date;
        updateTask(id, project, { dueDate });
    };
    
    checkboxBtn.addEventListener("click", () => {
        checkboxBtn.classList.add("checked");
        setTimeout(() => {
            complete = !complete;
            const updatedTask = todoList.updateTask(id, { complete });
            toggleTask(updatedTask);
            checkboxBtn.classList.remove("checked");
        }, 210);
    });

    dueDateText.addEventListener("click", () => {
        activeDueDatePicker(dueDateText, (date) => {
            if(complete) return;
            changeDueDateEvent(date);
        }, dueDate);
    });
    // task actions
    editTask.addEventListener("click", () => activeTaskEditor(taskEl, (...params) => {
        updateTask(id, ...params);
    }, task));

    changeDueDate.addEventListener("click", () => {
        activeDueDatePicker(changeDueDate, changeDueDateEvent, dueDate);
    });

    deleteTask.addEventListener("click", () => {
        activeDeleteWarning(name, () => {
            todoList.deleteTask(id);
            taskEl.remove();
            changeNumTask(project);
        });
    });

    taskEl.setAttribute("data-id", id);

    return taskEl;
}

export {
    createTaskElement
}