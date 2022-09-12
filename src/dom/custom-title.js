import { customTitle } from "./elements";

let targetArr = [...document.querySelectorAll("[data-title]")];
let timeout;

const mutationObserver = new MutationObserver(() => {
  targetArr = [...document.querySelectorAll("[data-title]")];
  targetArr.forEach(setCustomTitleEvents);
});

mutationObserver.observe(document.body, { childList: true, subtree: true });

targetArr.forEach(setCustomTitleEvents);

function setCustomTitleEvents(target) {
  target.addEventListener("mouseenter", mouseEnterEvent);

  target.addEventListener("mouseleave", mouseLeaveEvent);
}

function mouseEnterEvent(e) {
  customTitle.innerText = e.target.dataset.title;
  timeout = setTimeout(() => {
    const { x, y } = calculatePosition(e.target);
    customTitle.style.cssText = `top: ${y}px; left: ${x}px`;
  }, 700);
}

function mouseLeaveEvent() {
  clearTimeout(timeout);
  customTitle.style.cssText = "";
}

function calculatePosition(el) {
  const PADDING = 8;
  const {
    width: elWidth,
    left: elLeft,
    bottom: elBottom,
  } = el.getBoundingClientRect();
  const { width: customTitleWidth } = customTitle.getBoundingClientRect();
  const { width: bodyWidth } = document.body.getBoundingClientRect();
  return {
    x: Math.min(
      Math.max(elLeft + elWidth / 2 - customTitleWidth / 2, PADDING),
      bodyWidth - customTitleWidth - PADDING
    ),
    y: elBottom + PADDING / 4,
  };
}
