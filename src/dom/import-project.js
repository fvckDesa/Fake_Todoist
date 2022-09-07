import { parseFile } from "../utils/file";
import {
  importProjectContainer,
  importProject,
  closeImportProject,
  importProjectDragAndDropArea,
  importProjectInput,
} from "./elements";

let action;
let dragOverTimeout;

importProjectContainer.addEventListener("click", () => {
  importProjectContainer.classList.add("hidden");
});

importProject.addEventListener("click", (e) => {
  e.stopPropagation();
});

closeImportProject.addEventListener("click", () => {
  importProjectContainer.classList.add("hidden");
});

importProjectDragAndDropArea.addEventListener("dragover", (e) => {
  e.preventDefault();

  importProjectDragAndDropArea.classList.add("drag-over");

  clearTimeout(dragOverTimeout);
  dragOverTimeout = setTimeout(() => {
    importProjectDragAndDropArea.classList.remove("drag-over");
  }, 300);
}, false);

importProjectDragAndDropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();

  e.dataTransfer.dropEffect = "copy";

  handleFile(e.dataTransfer.files[0]);
}, false);

importProjectInput.addEventListener("change", () => {
  handleFile(importProjectInput.files[0]);
});

export default function activeImportProject(cb) {
  importProjectContainer.classList.remove("hidden");
  action = cb;
}

async function handleFile(file) {
  const tasks = await parseFile(file);

  action(tasks);

  importProjectContainer.classList.add("hidden");
}