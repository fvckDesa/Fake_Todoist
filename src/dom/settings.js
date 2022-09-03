import { settings, settingsContainer, setting, settingsList, settingContent, settingName, settingFooter, closeSettingsBtn } from "./elements";
import getSettingPage from "./settings-pages";
import { settingsType } from "../settings/type";
import { changeSettings } from "../settings";
import { getDefaultOptions } from "date-fns";

let handleSubmit = () => {};

let settingSelect;

settingsContainer.addEventListener("click", () => {
    settingsContainer.classList.add("hidden");
    resetSettings();
});

settings.addEventListener("click", (e) => {
    e.stopPropagation();
});

setting.addEventListener("submit", (e) => {
    e.preventDefault();
    settingFooter.classList.remove("active");
    for(const { setting, value } of handleSubmit()) {
        changeSettings(setting, value);
    }
});

setting.addEventListener("reset", (e) => {
    e.preventDefault();
    resetSettings();
});

closeSettingsBtn.addEventListener("click", () => {
    settingsContainer.classList.add("hidden");
    resetSettings();
});

createSettings();

export default function activeSettings(setting) {
    settingsContainer.classList.remove("hidden");

    settingsList.querySelector(`[data-setting="${setting}"`).click();
}

function createSettings() {
    settingsList.replaceChildren(
        ...settingsType.map(({ setting, icon }) => {
            const settingsItem = document.createElement("li");
            settingsItem.classList.add("settings-item");
            settingsItem.dataset.setting = setting;

            const iconEl = document.createElement("svg-loader");
            iconEl.classList.add("settings-item-icon");
            iconEl.src = icon;

            const name = document.createElement("h3");
            name.innerText = setting;

            settingsItem.append(iconEl, name);

            settingsItem.addEventListener("click", () => {
                settingSelect = setting;
                const { page, getValue } = getSettingPage(setting);

                handleSubmit = getValue;
                settingContent.replaceChildren(page);

                settingsList.querySelector(".active")?.classList.remove("active");
                settingsItem.classList.add("active");

                settingName.innerText = setting;
            });

            return settingsItem;
        })
    );
}

function resetSettings() {
    settingFooter.classList.remove("active");
    for(const [name, value] of Object.entries(getDefaultOptions())) {
        changeSettings(name, value);
    }
}

export function handleChange(name, value) {
    settingFooter.classList.toggle("active", getDefaultOptions()[name] !== value);
}