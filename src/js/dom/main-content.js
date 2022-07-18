import { mainContent, mainHeader } from './elements.js';

mainContent.addEventListener("scroll", () => {
    if(mainContent.scrollTop > 0) {
        mainHeader.classList.add("scrolled");
    } else {
        mainHeader.classList.remove("scrolled");
    }
});

function setMainContent() {}

export default setMainContent;