import './style.css';

const sideBar = document.querySelector(".sidebar");
const menu = document.querySelector(".menu-icon");
const main = document.querySelector("main");

menu.addEventListener("click", () => {
    sideBar.classList.toggle("hide");
    main.classList.toggle("translate");
});