import { inboxProject, todayProject } from "./elements";
import { changeNumTask } from "./project";
import todoList from "../module/todo-list";
import { setProject } from "./main-content";
import { overdueFilter, todayFilter } from "../utils/filters";
import format from "date-fns/format";
import { endOfToday } from "date-fns";
import { formatDateString } from "../utils/due-date";

inboxProject.setAttribute("data-id", todoList.inbox.id);
changeNumTask(todoList.inbox);
inboxProject.addEventListener("click", () => setProject(todoList.inbox));

todayProject.setAttribute("data-id", todoList.today.id);
todayProject.addEventListener("click", setTodayProject);

export function setTodayProject() {
    const title = `${formatDateString(new Date())} ‧ Today ‧ ${format(new Date(), "eeee")}`;
    setProject(
        todoList.today,
        [{ filter: overdueFilter }, { title, filter: todayFilter }],
        { dueDate: endOfToday(), project: todoList.inbox }
    );
}