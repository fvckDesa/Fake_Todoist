import { inboxProject } from "./elements";
import { projectClick } from "./project";
import todoList from "../module/todo-list";

inboxProject.addEventListener("click", () => projectClick(todoList.inbox.id, inboxProject));