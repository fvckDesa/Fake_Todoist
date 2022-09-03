import { searchInput, quickAddBtn, homeBtn, themeBtn } from "./elements";
import activeQuickAdd from "./quick-add";
import { addTask } from "./task";
import { setTodayProject } from "./default-project";
import activeSettings from "./settings";

searchInput.addEventListener("focusout", () => {
  searchInput.value = "";
});

quickAddBtn.addEventListener("click", () => activeQuickAdd(addTask));

homeBtn.addEventListener("click", setTodayProject);

themeBtn.addEventListener("click", () => activeSettings("theme"));