import "../styles/project-form.css";
import ColorList from "../colors.json";

const addProjectForm = document.querySelector(".add-project-form");

const name = addProjectForm.querySelector("#name");
name.addEventListener("keydown", () => {
  name.classList.add("input-focus");
});

name.addEventListener("focusout", () => name.classList.remove("input-focus"));

const color = addProjectForm.querySelector("#color");
const colorList = addProjectForm.querySelector(".color-list");
color.addEventListener("click", () => colorList.classList.toggle("hidden"));
/* color.addEventListener("focusout", () =>
        colorList.classList.add("hidden")
    ); */

const template = document.querySelector("[color-form-template]").content;
const container = addProjectForm.querySelector(".color-list");

const black = template.cloneNode(true);
black.querySelector(".color-circle").style.backgroundColor = "#000";
black.querySelector(".color-name").innerText = "Black";
black.querySelector("li").addEventListener("click", () => {
  color.querySelector(".color-circle").style.backgroundColor = "#000";
  color.querySelector(".color-name").innerText = "Black";
  colorList.classList.add("hidden");
});
container.appendChild(black);

for (const [hex, name] of Object.entries(ColorList)) {
  const copy = template.cloneNode(true);
  copy.querySelector(".color-circle").style.backgroundColor = hex;
  copy.querySelector(".color-name").innerText = name;
  copy.querySelector("li").addEventListener("click", () => {
    color.querySelector(".color-circle").style.backgroundColor = hex;
    color.querySelector(".color-name").innerText = name;
    colorList.classList.add("hidden");
  });
  container.appendChild(copy);
}


const cancel = addProjectForm.querySelector('footer>[type="button"]');
cancel.addEventListener("click", () => {
    addProjectForm.classList.add("hidden");
    color.querySelector(".color-circle").style.backgroundColor = "#000";
    color.querySelector(".color-name").innerText = "Black";
    container.classList.add("hidden");
    addProjectForm.querySelector("input").value = "";
})
