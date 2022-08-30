import { isBefore, isToday } from "date-fns/esm";
import { getCurrentProject } from "../dom/main-content";
import todoList from "../module/todo-list";

export function projectFilter({ id }) {
    return todoList.taskProject(id) === getCurrentProject();
}

export function todayFilter({ dueDate }) {
    return !isBefore(dueDate, new Date()) && isToday(dueDate);
}

export function overdueFilter({ dueDate }) {
    return isBefore(dueDate, new Date());
}