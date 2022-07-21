import { searchInput } from './elements.js';

searchInput.addEventListener("focusout", () => {
    searchInput.value = "";
});