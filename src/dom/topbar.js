import { searchInput, quickAddBtn } from './elements.js';
import activeQuickAdd from './quick-add.js';
import { addTask } from "../utilities/dom-utilities.js";

searchInput.addEventListener("focusout", () => {
    searchInput.value = "";
});

quickAddBtn.addEventListener("click", () => activeQuickAdd(addTask));