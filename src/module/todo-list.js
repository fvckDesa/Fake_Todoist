import Project from "./project";
import { parseJSON, isSameDay } from "date-fns";

const todoList = (() => {
  const projects = JSON.parse(localStorage.getItem("projects") ?? "[]").map(
    ({ name, color, tasks }) => {
      // transform due date from JSON string to date object
      tasks = tasks.map(({ dueDate, ...others }) => ({
        ...others,
        dueDate: parseJSON(dueDate),
      }));
      return new Project(name, color, tasks);
    }
  );
  // add default project if none exists
  if (projects.length === 0) addProject("Inbox");

  // public
  function addProject(name, color) {
    // create new project
    const project = new Project(name, color);
    projects.push(project);
    // save project to local storage
    _saveProjects();

    return project;
  }

  function addTask(nameProject, taskAttributes) {
    // find project
    const project = projects.find((project) => project.name === nameProject);
    // add task to project
    const task = project.addTask(taskAttributes);
    // save project to local storage
    _saveProjects();

    return task;
  }

  function find(callback) {
    return projects.find(callback);
  }

  function getTaskFromDate(date) {
    return projects.reduce(
      (acc, { tasks }) =>
        acc.concat(tasks.filter((task) => isSameDay(task.dueDate, date))),
      []
    );
  }

  // private
  function _saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  return {
    addProject,
    addTask,
    find,
    getTaskFromDate,
    get projects() {
      return projects;
    },
  };
})();

export default todoList;
