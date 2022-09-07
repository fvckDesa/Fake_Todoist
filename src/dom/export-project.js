import {
  exportProjectContainer,
  exportProject,
  closeExportProject,
  exportCSV,
  exportJSON,
} from "./elements";
import { createFile } from "../utils/file"; 

let data = {};

exportProjectContainer.addEventListener("click", () => {
  exportProjectContainer.classList.add("hidden");
});

exportProject.addEventListener("click", (e) => {
  e.stopPropagation();
});

closeExportProject.addEventListener("click", () => {
  exportProjectContainer.classList.add("hidden");
});

exportCSV.addEventListener("click", () => {
  exportProjectContainer.classList.add("hidden");
  downloadFile("text/csv");
});

exportJSON.addEventListener("click", () => {
  exportProjectContainer.classList.add("hidden");
  downloadFile("application/json");
});

export default function activeExportProject(name, content) {
  exportProjectContainer.classList.remove("hidden");
  data = { name, content };
}

function downloadFile(type) {
  const { name, content } = data;
  const file = createFile(name, content, type);
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 0);
}