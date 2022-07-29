import { setDefaultOptions, getDefaultOptions } from "date-fns";

const defaultConfig = {
    weekStartsOn: 1,
}

function configApp() {
    const config = localStorage.getItem('config') 
        ? JSON.parse(localStorage.getItem('config')) 
        : defaultConfig
    
    setDefaultOptions(config);
}

export function changeConfig(configName, value) {
    const config = getDefaultOptions();
    config[configName] = value;
    // set config 
    setDefaultOptions(config);
    // save config
    localStorage.setItem('config', JSON.stringify(config));
}

export default configApp;