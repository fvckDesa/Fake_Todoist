import { setDefaultOptions, getDefaultOptions } from "date-fns";
import { setTheme, setAutoDarkMode } from "../dom/settings-pages/theme";

const defaultSettings = {
    weekStartsOn: 1,
    theme: "todoist",
    autoDarkMode: true
}
// get settings saved local storage
const settings = localStorage.getItem('settings') 
        ? JSON.parse(localStorage.getItem('settings')) 
        : defaultSettings;
// set every settings
const { theme, autoDarkMode } = settings;
setTheme(theme);
setAutoDarkMode(autoDarkMode);

setDefaultOptions(settings);

export function changeSettings(settingsName, value) {
    const settings = getDefaultOptions();
    settings[settingsName] = value;
    switch(settingsName) {
        case "theme":
            setTheme(value);
            break;
        case "autoDarkMode":
            setAutoDarkMode(value);
            break;
    }

    // set settings 
    setDefaultOptions(settings);
    // save settings
    localStorage.setItem('settings', JSON.stringify(settings));
}