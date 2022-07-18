import { taskContainer, taskEditor, taskNameInput, taskDescriptionInput, taskEditorSubmit } from "./elements";

let lastElement;

taskNameInput.addEventListener("input", () => {
    taskEditorSubmit.disabled = !taskNameInput.value;
});

taskDescriptionInput.addEventListener("input", formatTaskDescription);

taskEditor.addEventListener("submit", (e) => {
    e.preventDefault();
});

taskEditor.addEventListener("reset", resetTaskEditor);

function resetTaskEditor() {
    taskContainer.replaceChild(lastElement, taskEditor);
}

function setTaskEditor(element) {
    if(taskContainer.contains(taskEditor)) resetTaskEditor();
    taskContainer.replaceChild(taskEditor, element);
    lastElement = element;
}

function formatTaskDescription() {
    const lineHeight = parseInt(getComputedStyle(taskDescriptionInput).getPropertyValue("line-height"));
    const numNewLine = taskDescriptionInput.value
        .split("\n")
        .map(el => Math.ceil(el.length / (taskDescriptionInput.scrollWidth / 5.6)))
        .reduce((sum, n) => sum + n, taskDescriptionInput.value.split("\n").length);

    taskDescriptionInput.style.cssText = `--height: ${numNewLine * lineHeight}px`;
}

export {
    setTaskEditor,
    formatTaskDescription
}