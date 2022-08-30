import { isToday } from "date-fns/esm";
import { getCurrentProject } from "../dom/main-content";
import { isBeforeDay } from "./due-date";
import todoList from "../module/todo-list";

export function projectFilter({ id }) {
    return todoList.taskProject(id) === getCurrentProject();
}

export function todayFilter({ dueDate }) {
    return isToday(dueDate);
}

export function overdueFilter({ dueDate }) {
    return isBeforeDay(dueDate, new Date());
}