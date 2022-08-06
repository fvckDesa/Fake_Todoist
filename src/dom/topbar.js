import { searchInput, quickAddBtn } from "./elements";
import activeQuickAdd from "./quick-add";
import { addTask } from "./task";

searchInput.addEventListener("focusout", () => {
  searchInput.value = "";
});

quickAddBtn.addEventListener("click", () => activeQuickAdd(addTask));
