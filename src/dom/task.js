import { taskTemplate } from "./elements";
import Icons from "../assets/icons";
import activeDueDatePicker from "./due-date-picker";
import activeTaskEditor from "./task-editor";
import { getDueDateInfo } from "../utils/due-date";
import todoList from "../module/todo-list";
import { deleteTask, setProject, setUpdatedTask  } from "./main-content";
import activeDeleteWarning from "./delete-warning";
import { getCurrentProject, setTask, toggleTask } from "./main-content.js";
import { createTaskProject } from "../utils/dom";
import { changeProject } from "./sidebar";

function createTaskElement(task) {
    let { name, id, dueDate, complete } = task;
    const project = todoList.taskProject(id);
    // task element and its children
    const taskEl = taskTemplate.cloneNode(true).firstElementChild;
    const [ checkboxBtn, content, actionContainer] = taskEl.children;
    const tic = checkboxBtn.querySelector("#tic-icon");
    const [ taskName, taskDescription, taskInfo ] = content.children;
    const [ taskDueDate, taskProject ] = taskInfo.children;
    const [ dueDateIcon, dueDateText ] = taskDueDate.children;
    const [ editTask, changeDueDate, comment, deleteTaskBtn ] = actionContainer.children;
    // set svg
    tic.setAttribute("src", Icons.TaskTic);
    dueDateIcon.setAttribute("src", Icons.DueDateXs);
    editTask.querySelector("svg-loader").setAttribute("src", Icons.Edit);
    changeDueDate.querySelector("svg-loader").setAttribute("src", Icons.DueDateXl);
    comment.querySelector("svg-loader").setAttribute("src", Icons.Comment);
    deleteTaskBtn.querySelector("svg-loader").setAttribute("src", Icons.GarbageContainer);
    // set attributes
    setTaskProps(task);
    taskProject.replaceChildren(...(project !== getCurrentProject() ? createTaskProject(project) : []));
    taskEl.setAttribute("data-id", id);
    // events
    const changeDueDateEvent = (date) => {
        dueDate = date;
        todoList.updateTask(id, { dueDate });
        setDueDate(date);
        setUpdatedTask(task, taskEl, project);
    };
    
    checkboxBtn.addEventListener("click", () => {
        checkboxBtn.classList.add("checked");
        setTimeout(() => {
            complete = !complete;
            todoList.updateTask(id, { complete });
            toggleTask(taskEl, task);
            checkboxBtn.classList.remove("checked");
        }, 210);
    });

    taskDueDate.addEventListener("click", () => {
        activeDueDatePicker(taskDueDate, dueDate, (date) => {
            if(complete) return;
            changeDueDateEvent(date);
        });
    });

    taskProject.addEventListener("click", () => {
        setProject(project);
        changeProject(project.id);
    });
    // task actions
    editTask.addEventListener("click", () => {
        activeTaskEditor(taskEl,  task, (newProject, taskProps) => {
            setTaskProps(taskProps);
            todoList.updateTask(id, taskProps, newProject === project ? null : newProject);
            setUpdatedTask(task, taskEl, project);
    
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

    deleteTaskBtn.addEventListener("click", () => {
        activeDeleteWarning(name, () => {
            todoList.deleteTask(id);
            deleteTask(taskEl, project);
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
  setTask(task);
}

export {
    createTaskElement,
    addTask
}