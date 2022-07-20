import Project from "./project";

const todoList = (() => {
    const projects = JSON.parse(localStorage.getItem('projects') ?? "[]")
        .map(({ name, color, tasks }) => new Project(name, color, tasks));
    // add default project if none exists
    if(projects.length === 0) addProject("Inbox");
    
    // public
    function addProject(name, color) {
        // create new project
        const project = new Project(name, color);
        projects.push(project);
        // save project to local storage
        _saveProjects();

        return project;
    }

    function find(callback) {
        return projects.find(callback);
    }

    // private
    function _saveProjects() {
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    return {
        addProject,
        find,
        get projects() {
            return projects;
        }
    }
})();

export default todoList;