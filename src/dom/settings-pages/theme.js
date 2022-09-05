import { themePageTemplate } from "../elements";
import * as Themes from "../../assets/themes";
import { changeSettings } from "../../settings";

let themePick = null;
let handleChange;

const themePage = themePageTemplate.cloneNode(true).firstElementChild;
const autoDarkMode = themePage.querySelector("#auto-dark-mode");

themePage.querySelector(".themes-container").replaceChildren(
    ...Object.entries(Themes).map(([name, src]) => {
        const theme = document.createElement("svg-loader");
        theme.classList.add("theme-item");
        theme.src = src;

        theme.dataset.theme = name;

        theme.addEventListener("click", () => {
            themePick = name;
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

export default function activeThemePage(change) {
    handleChange = change ?? (() => {});
    return {
        page: themePage,
        getValue: () => ([
            {
                setting: "theme",
                value: themePick
            }
        ])
    }
}

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