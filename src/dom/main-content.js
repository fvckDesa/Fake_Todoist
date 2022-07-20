import {
  mainContent,
  mainHeader,
  mainTitle,
  taskContainer,
  completedTaskContainer,
  addTask,
} from "./elements.js";
import todoList from "../module/todo-list";
import { createTaskElement } from "./task.js";

mainContent.addEventListener("scroll", () => {
  if (mainContent.scrollTop > 0) {
    mainHeader.classList.add("scrolled");
  } else {
    mainHeader.classList.remove("scrolled");
  }
});

function setProject(name) {
  // get project
  const project = todoList.find((project) => project.name === name);
  // set main title
  mainTitle.textContent = project.name;
  // set tasks
  taskContainer.replaceChildren(
    ...project
    // get uncompleted tasks and create their elements
      .filterTask((task) => !task.completed)
      .map(createTaskElement)
      // add "add task" button at the end
      .concat(addTask)
  );
  completedTaskContainer.replaceChildren(
    ...project
    // get completed tasks and create their elements
      .filterTask((task) => task.completed)
      .map(createTaskElement)
  );
}

function setMainContent() {}

export default setMainContent;
export { setProject };
