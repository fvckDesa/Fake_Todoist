import {
  infoPopUpContainer,
  infoPopUp,
  infoPopUpTitle,
  infoPopUpText,
  infoPopUpSubmit
} from "./elements";

let submitCb;

infoPopUpContainer.addEventListener("click", () => {
  infoPopUpContainer.classList.add("hidden");
});

infoPopUp.addEventListener("submit", (e) => {
  e.preventDefault();

  submitCb();

  infoPopUpContainer.classList.add("hidden");
});

infoPopUp.addEventListener("reset", () => {
  infoPopUpContainer.classList.add("hidden");
});

infoPopUp.addEventListener("click", (e) => {
  e.stopPropagation();
});

function activeInfoPopUp(title, text, btn, strongWords = [], next = () => {}) {
  const txt = strongWords.reduce((txt, word) => txt.replaceAll(word, (match) => {
    return `<strong>${match}</strong>`;
  }), text);
  infoPopUpTitle.innerText = title;
  infoPopUpText.innerHTML = txt;
  infoPopUpSubmit.innerText = btn;
  infoPopUpContainer.classList.remove("hidden");
  submitCb = next;
}

export default activeInfoPopUp;
