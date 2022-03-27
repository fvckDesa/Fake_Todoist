import './style.css';
import './styles/header.css';
import './styles/sidebar.css';
import './styles/main.css';


const menu = document.querySelector(".menu-icon");

menu.addEventListener("click", moveSideBar);

function moveSideBar() {
    const sideBar = document.querySelector(".sidebar");
    const main = document.querySelector("main");

    sideBar.classList.toggle("hide");
    main.classList.toggle("translate");
}

//#region test for user projects
const template = document.querySelector("[user-project-template]").content;
const container = document.querySelector(".user-container");

for(let i = 0; i < 10; i++){
    const copy = template.cloneNode(true);
    copy.querySelector(".sidebar-item-text-name").innerText = "Prova";
    copy.querySelector(".sidebar-item-text-number").innerText = i;
    container.appendChild(copy);
}

//#endregion