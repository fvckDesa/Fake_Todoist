import Colors from "../../assets/colors.json";
import Icons from "../../assets/svg";
import {
  projectForm,
  colorSelector,
  colorList,
  nameProjectInput,
  cancelProjectBtn,
  addProjectBtn,
  projectFormContainer,
} from "./elements";

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

cancelProjectBtn.addEventListener("click", () => {
  projectFormContainer.classList.add("hidden");
  colorSelector.innerHTML = `
    <div class="color-icon" style="--color: #808080"></div>
    <div class="color-name">Gray</div>
  `;

  document.querySelector(".current-color").classList.remove("current-color");
  document.querySelector("#gray").classList.add("current-color");

  addProjectBtn.disabled = true;
});

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

function setColorList() {
  for (const [hex, name] of Object.entries(Colors)) {
    const color = document.createElement("li");
    color.classList.add("color");
    
    color.innerHTML = `
      <div class="color-icon" style="--color: ${hex}"></div>
      <h3 class="color-name">${name}</h3>
      <svg-loader class="color-tic-icon" src="${Icons.ColorTic}"></svg-loader>
    `;

    color.addEventListener("click", () => {
      colorSelector.innerHTML = `
        <div class="color-icon" style="--color: ${hex}"></div>
        <h3 class="color-name">${name}</h3>
      `;

      colorList.classList.add("hidden");
      document
        .querySelector(".current-color")
        .classList.remove("current-color");
      color.classList.add("current-color");
    });

    if (name === "Gray") {
      color.classList.add("current-color");
      color.id = "gray";
    };

    colorList.appendChild(color);
  }
}

function activeProjectForm() {
  setColorList();
}

export default activeProjectForm;
