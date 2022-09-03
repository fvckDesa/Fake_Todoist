import { themePageTemplate } from "../elements";
import * as Themes from "../../assets/themes";
import { handleChange } from "../settings";
import { changeSettings } from "../../settings";

let themePick = null;

const themePage = themePageTemplate.cloneNode(true).firstElementChild;
const autoDarkMode = themePage.querySelector("#auto-dark-mode");

themePage.querySelector(".themes-container").replaceChildren(
    ...Object.entries(Themes).map(([name, src]) => {
        const theme = document.createElement("svg-loader");
        theme.classList.add("theme-item");
        theme.src = src;

        theme.dataset.theme = name;

        theme.addEventListener("click", () => {
            themePick = document.body.classList.contains(name) ? null : name;
            setTheme(name);
            handleChange("theme", themePick);
        });

        return theme;
    })
);

autoDarkMode.addEventListener("input", () => {
    setAutoDarkMode(autoDarkMode.checked);
    changeSettings("autoDarkMode", autoDarkMode.checked);
});

const darkScheme = window.matchMedia("(prefers-color-scheme: dark)");
darkScheme.addEventListener("change", (e) => {
    if(!autoDarkMode.checked) return;
    setTheme(e.matches ? "dark" : "todoist");
});

function getValue() {
    return [
        {
            setting: "theme",
            value: themePick
        }
    ]
}

const theme = {
    page: themePage,
    getValue
}

export default theme;

export function setTheme(theme) {
    document.body.className = "";
    document.body.classList.add(theme);
    
    themePage.querySelector(".active")?.classList.remove("active");
    themePage.querySelector(`[data-theme="${theme}"]`).classList.add("active");
}

export function setAutoDarkMode(bool) {
    if(autoDarkMode.checked && !bool) autoDarkMode.click();
    if(!autoDarkMode.checked && bool) autoDarkMode.click();
    if(autoDarkMode.checked && darkScheme.matches) setTheme("dark");
}