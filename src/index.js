import './style.css';
import './styles/topbar.css';
import './styles/sidebar.css';
import './styles/main.css';
import './styles/todo.css';


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

const temp = document.querySelector("[todo-template]").content;
const contTemp = document.querySelector(".task");

contTemp.appendChild(temp.cloneNode(true));

for(let i = 0; i < 10; i++){
    contTemp.appendChild(temp.cloneNode(true));
}

for(let i = 0; i < 10; i++){
    document.querySelector(".complete-task").appendChild(temp.cloneNode(true));
}