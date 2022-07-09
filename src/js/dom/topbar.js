import { searchInput, searchIcon } from './elements.js';
import Icons from '../../assets/svg';

searchInput.addEventListener("mouseover", () => {
    searchIcon.src = Icons.SearchBlack;
});

searchInput.addEventListener("mouseleave", () => {
    if(searchInput === document.activeElement) return;
    searchIcon.src = Icons.Search;
});

searchInput.addEventListener("focus", () => {
    searchIcon.src = Icons.SearchBlack;
});

searchInput.addEventListener("focusout", () => {
    searchIcon.src = Icons.Search;
    searchInput.value = "";
});

function activeTopbar() {}

export default activeTopbar;