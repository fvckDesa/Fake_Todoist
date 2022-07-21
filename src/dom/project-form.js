import Colors from "../assets/colors.json";
import Icons from "../assets/svg";
import {
  projectForm,
  colorSelector,
  colorList,
  nameProjectInput,
  cancelProjectBtn,
  addProjectBtn,
  projectFormContainer
} from "./elements";
import { createProjectElement, renderProjects } from "./project";
import todoList from "../module/todo-list";

createColorList();

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get project name and color
  const name = nameProjectInput.value;
  const color = colorSelector.querySelector(".color-icon").style.getPropertyValue("--color");
  // add project
  const newProject = todoList.addProject(name, color);
  const projectEl = createProjectElement(newProject);
  renderProjects(projectEl);
  // reset project form
  resetProjectForm();
});

cancelProjectBtn.addEventListener("click", resetProjectForm);

nameProjectInput.addEventListener("input", () => {
  addProjectBtn.disabled = nameProjectInput.value.length > 0 ? false : true;
});

nameProjectInput.addEventListener("keydown", () => {
  nameProjectInput.classList.add("write");
});

nameProjectInput.addEventListener("focusout", () => {
  nameProjectInput.classList.remove("write");
});

colorSelector.addEventListener("click", () => {
  colorList.classList.toggle("hidden");
});

function createColorList() {
  for (const [hex, name] of Object.entries(Colors)) {
    // create color element
    const color = document.createElement("li");
    color.classList.add("color");
    color.innerHTML = `
      <div class="color-icon" style="--color: ${hex}"></div>
      <h3 class="color-name">${name}</h3>
      <svg-loader class="color-tic-icon" src="${Icons.ColorTic}"></svg-loader>
    `;
    // set color selector to color on click
    color.addEventListener("click", () => {
      colorSelector.innerHTML = `
        <div class="color-icon" style="--color: ${hex}"></div>
        <h3 class="color-name">${name}</h3>
      `;
      // close color list
      colorList.classList.add("hidden");
      // change current color in color list
      document
        .querySelector(".current-color")
        .classList.remove("current-color");
      color.classList.add("current-color");
    });
    // set gray to default color
    if (name === "Gray") {
      color.classList.add("current-color");
      color.id = "gray";
    };

    colorList.appendChild(color);
  }
}

function resetProjectForm() {
  // hidden elements
  projectFormContainer.classList.add("hidden");
  colorList.classList.add("hidden");
  // reset color selector to gray
  colorSelector.innerHTML = `
    <div class="color-icon" style="--color: #808080"></div>
    <div class="color-name">Gray</div>
  `;
  // reset color list to gray
  document.querySelector(".current-color").classList.remove("current-color");
  document.querySelector("#gray").classList.add("current-color");
  // disabled add project btn
  addProjectBtn.disabled = true;
  // reset name input
  nameProjectInput.value = "";
}
