import Icons from "../assets/icons";

export function createTaskProject({ name, color }) {
    const icon = document.createElement("svg-loader");
    icon.src = color ? Icons.Circle : Icons.Inbox;
    icon.style.color = color;

    const text = document.createElement("span");
    text.textContent = name;

    return [icon, text];
}