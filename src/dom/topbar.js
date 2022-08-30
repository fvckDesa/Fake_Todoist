import { searchInput, quickAddBtn, homeBtn } from "./elements";
import activeQuickAdd from "./quick-add";
import { addTask } from "./task";
import { setTodayProject } from "./default-project";

searchInput.addEventListener("focusout", () => {
  searchInput.value = "";
});

quickAddBtn.addEventListener("click", () => activeQuickAdd(addTask));

homeBtn.addEventListener("click", setTodayProject);