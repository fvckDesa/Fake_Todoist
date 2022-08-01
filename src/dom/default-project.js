import { inboxProject } from "./elements";
import { projectClick, changeNumTask } from "./project";
import todoList from "../module/todo-list";

inboxProject.setAttribute("data-id", todoList.inbox.id);
changeNumTask(todoList.inbox);
inboxProject.addEventListener("click", () => projectClick(todoList.inbox, inboxProject));