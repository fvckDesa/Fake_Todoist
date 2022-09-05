import activeThemePage from "./theme";
import activeGeneralPage from "./general";

export default function getSettingsPage(setting, change = () => {}) {
    switch(setting) {
        case "general": return activeGeneralPage(change);
        case "theme": return activeThemePage(change);
        default:
            throw new Error(`${setting} setting doesn't exist`);
    }
}