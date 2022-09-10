import { prioritySelectorContainer, prioritySelector, priorityItems } from "./elements";

let selectCb;
let closeCb;

prioritySelectorContainer.addEventListener("click", closePrioritySelector);

prioritySelector.addEventListener("click", (e) => {
  e.stopPropagation();
});

priorityItems.forEach(priorityItem => {
  priorityItem.addEventListener("click", () => {
    selectCb(+priorityItem.dataset.priority);

    closePrioritySelector();
  });
});

export default function activePrioritySelector(el, priority = 4, next = () => {}, close = () => {}) {
  selectCb = next;
  closeCb = close;
  
  prioritySelectorContainer.classList.remove("hidden");

  setPriority(priority);
  positionPrioritySelector(el);
}

function setPriority(priority) {
  prioritySelector.querySelector(".active")?.classList.remove("active");
  priorityItems.find(({ dataset }) => +dataset.priority === priority).classList.add("active");
}

function positionPrioritySelector(el) {
  const { width: elWidth, height: elHeight, top: elTop, left: elLeft } = el.getBoundingClientRect();
  const { width: prioritySelectorWidth, height: prioritySelectorHeight } = prioritySelector.getBoundingClientRect();
  const { height: bodyHeight, width: bodyWidth } = document.body.getBoundingClientRect();
  const x = elLeft + elWidth / 2 + prioritySelectorWidth / 2 < bodyWidth
    ? elLeft + elWidth / 2 - prioritySelectorWidth / 2
    : bodyWidth - prioritySelectorWidth;
  const y = elTop + elHeight + prioritySelectorHeight < bodyHeight
    ? elTop + elHeight
    : elTop - prioritySelectorHeight;

  prioritySelector.style.cssText += `top: ${y}px; left: ${x}px`;
}

function closePrioritySelector() {
  closeCb();
  prioritySelectorContainer.classList.add("hidden");
}