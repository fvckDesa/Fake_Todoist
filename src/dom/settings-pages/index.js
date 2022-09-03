import theme from "./theme";

export default function getSettingsPage(setting) {
    switch(setting) {
        case "general": return "";
        case "theme": return theme;
        default:
            throw new Error(`${setting} setting doesn't exist`);
    }
}