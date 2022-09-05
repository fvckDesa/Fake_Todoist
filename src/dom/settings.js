import {
  settings,
  settingsContainer,
  setting,
  settingsList,
  settingContent,
  settingName,
  settingFooter,
  closeSettingsBtn,
} from "./elements";
import getSettingPage from "./settings-pages";
import { settingsType } from "../settings/data";
import appSettings, { changeSettings } from "../settings";
import activeInfoPopUp from "./info-pop-up";

let handleSubmit = () => {};

let settingSelect;
let isChange = false;

settingsContainer.addEventListener("click", closeSettings);

settings.addEventListener("click", (e) => {
  e.stopPropagation();
});

setting.addEventListener("submit", (e) => {
  e.preventDefault();
  settingFooter.classList.remove("active");
  for (const { setting, value } of handleSubmit()) {
    changeSettings(setting, value);
  }
  isChange = false;
});

setting.addEventListener("reset", (e) => {
  e.preventDefault();
  resetSettings();
});

closeSettingsBtn.addEventListener("click", closeSettings);

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
        isChange = false;
        settingSelect = setting;
        const { page, getValue } = getSettingPage(setting, handleChange);

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
  if (settingSelect === "theme") changeSettings("theme", appSettings["theme"]);
  isChange = false;
}

function handleChange(name, value) {
  isChange = appSettings[name] !== value;
  settingFooter.classList.toggle("active", isChange);
}

function closeSettings() {
  if(!isChange) {
    settingsContainer.classList.add("hidden");
    resetSettings();
    return;
  }
  activeInfoPopUp(
    "Discard changes?",
    "The changes you've made won't be saved.",
    "Discard",
    [],
    () => {
      settingsContainer.classList.add("hidden");
      resetSettings();
    }
  );
}
