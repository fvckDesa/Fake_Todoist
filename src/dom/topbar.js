import { searchInput, quickAddBtn, homeBtn, themeBtn, generalBtn } from "./elements";
import activeQuickAdd from "./quick-add";
import { addTask } from "./task";
import activeSettings from "./settings";
import appSettings from "../settings";
import { setProject } from "./main-content";
import { setTodayProject } from "./default-project";
import todoList from "../module/todo-list";

searchInput.addEventListener("focusout", () => {
  searchInput.value = "";
});

quickAddBtn.addEventListener("click", () => activeQuickAdd(addTask));

homeBtn.addEventListener("click", () => {
  if (todoList.today.id === appSettings.homeView) {
    setTodayProject();
    return;
  }
  setProject(todoList.searchProjectById(appSettings.homeView));
});

themeBtn.addEventListener("click", () => activeSettings("theme"));

generalBtn.addEventListener("click", () => activeSettings("general"));