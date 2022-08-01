import {
  deleteWarningContainer,
  deleteWarning,
  deleteWarningName,
} from "./elements";

let submitCb;

deleteWarningContainer.addEventListener("click", () => {
  deleteWarningContainer.classList.add("hidden");
});

deleteWarning.addEventListener("submit", (e) => {
    e.preventDefault();

    submitCb();
    
    deleteWarningContainer.classList.add("hidden");
});

deleteWarning.addEventListener("reset", () => {
    deleteWarningContainer.classList.add("hidden");
});

deleteWarning.addEventListener("click", (e) => {
    e.stopPropagation();
});

function activeDeleteWarning(name = "", next = () => {}) {
    deleteWarningName.innerText = name;
    deleteWarningContainer.classList.remove("hidden");
    submitCb = next;
}

export default activeDeleteWarning;
