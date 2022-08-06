import { taskTemplate } from "./elements";
import Icons from "../assets/svg";
import activeDueDatePicker from "./due-date-picker";
import activeTaskEditor from "./task-editor";
import { getDueDateInfo } from "../utils/due-date";
import todoList from "../module/todo-list";
import { setUpdatedTask, toggleTask } from "./main-content";
import activeDeleteWarning from "./delete-warning";
import { changeNumTask } from "./project";
import { getCurrentProject, setTask } from "./main-content.js";

function createTaskElement(task) {
    let { name, id, dueDate, complete } = task;

    const project = todoList.taskProject(id);
    // task element and its children
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
    setTaskProps(task);
    // events
    const changeDueDateEvent = (date) => {
        dueDate = date;
        todoList.updateTask(id, { dueDate });
        setDueDate(date);
    };
    
    checkboxBtn.addEventListener("click", () => {
        checkboxBtn.classList.add("checked");
        setTimeout(() => {
            complete = !complete;
            todoList.updateTask(id, { complete });
            toggleTask(id, complete);
            checkboxBtn.classList.remove("checked");
        }, 210);
    });

    taskDueDate.addEventListener("click", () => {
        activeDueDatePicker(taskDueDate, dueDate, (date) => {
            if(complete) return;
            changeDueDateEvent(date);
        });
    });
    // task actions
    editTask.addEventListener("click", () => {
        activeTaskEditor(taskEl,  task, (project, task) => {
            setTaskProps(task);
            todoList.updateTask(id, task, project === getCurrentProject() ? null : project);
            setUpdatedTask(taskEl, project);
    
            dueDate = task.dueDate;
        });
    });

    changeDueDate.addEventListener("click", () => {
        changeDueDate.classList.add("active");

        activeDueDatePicker(
            changeDueDate,
            dueDate,
            (date) => {
                changeDueDateEvent(date);
                changeDueDate.classList.remove("active")
            },
            () => changeDueDate.classList.remove("active")
        );
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

    function setTaskProps({ name, description, dueDate }) {
        // task name
        if(!name) throw new Error("Task name is required");
        taskName.textContent = name;
        // task description
        taskDescription.textContent = description
        taskDescription.hidden = !description;
        // task due date
        setDueDate(dueDate);
    }

    function setDueDate(dueDate) {
        const { text, color } = getDueDateInfo(dueDate);

        taskDueDate.style.color = color ? `var(${color})` : "";
        dueDateText.textContent = text;

        taskDueDate.hidden = !dueDate;
    }
}

function addTask(project, taskAttr) {
  const task = todoList.addTask(project, taskAttr);
  project === getCurrentProject()
    ? setTask(task)
    : changeNumTask(project);
}

export {
    createTaskElement,
    addTask
}