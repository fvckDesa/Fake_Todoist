import { setDefaultOptions } from "date-fns";
import { setTheme, setAutoDarkMode } from "../dom/settings-pages/theme";
import { changeDueDateFormat, changeWeekStart } from "../utils/dom";
import { defaultSettings } from "./data";

// get settings saved local storage
const appSettings = localStorage.getItem("settings")
  ? JSON.parse(localStorage.getItem("settings"))
  : defaultSettings;
// set every settings
const { theme, autoDarkMode, weekStart } = appSettings;
setTheme(theme);
setAutoDarkMode(autoDarkMode);

setDefaultOptions({ weekStartsOn: weekStart });
changeWeekStart();

export function changeSettings(settingsName, value) {
  appSettings[settingsName] = value;
  switch (settingsName) {
    case "theme":
      setTheme(value);
      break;
    case "autoDarkMode":
      setAutoDarkMode(value);
      break;
    case "timeFormat":
    case "dateFormat":
    case "weekend":
      changeDueDateFormat();
      break;
    case "weekStart":
      setDefaultOptions({ weekStartsOn: value });
      changeWeekStart();
      changeDueDateFormat();
      break;
  }
  // save settings
  localStorage.setItem("settings", JSON.stringify(appSettings));
}

export default appSettings;
