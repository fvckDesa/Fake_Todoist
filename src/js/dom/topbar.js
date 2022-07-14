import { searchInput } from './elements.js';

searchInput.addEventListener("focusout", () => {
    searchInput.value = "";
});

function activeTopbar() {}

export default activeTopbar;