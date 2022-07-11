import { todoContainer, taskEditor, taskName, taskDescription, taskEditorSubmit } from "./elements";

let lastElement;

taskName.addEventListener("input", () => {
    taskEditorSubmit.disabled = !taskName.value;
});

taskDescription.addEventListener("input", formatTaskDescription);

taskEditor.addEventListener("submit", (e) => {
    e.preventDefault();
});

taskEditor.addEventListener("reset", resetTaskEditor);

function resetTaskEditor() {
    todoContainer.replaceChild(lastElement, taskEditor);
}

function setTaskEditor(element) {
    if(todoContainer.contains(taskEditor)) resetTaskEditor();
    todoContainer.replaceChild(taskEditor, element);
    lastElement = element;
}

function formatTaskDescription() {
    const lineHeight = parseInt(getComputedStyle(taskDescription).getPropertyValue("line-height"));
    console.log(getComputedStyle(taskDescription).width, taskDescription.scrollWidth)
    const numNewLine = taskDescription.value
        .split("\n")
        .map(el => Math.ceil(el.length / (taskDescription.scrollWidth / 5.6)))
        .reduce((sum, n) => sum + n, taskDescription.value.split("\n").length);

    taskDescription.style.cssText = `--height: ${numNewLine * lineHeight}px`;
}

export {
    setTaskEditor,
    formatTaskDescription
}