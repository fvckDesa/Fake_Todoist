import Project from "./project";
import { parseJSON, isSameDay } from "date-fns";

const todoList = (() => {
  let projects = JSON.parse(localStorage.getItem("projects") ?? "[]").map(
    ({ name, color, id, tasks }) => {
      // transform due date from JSON string to date object
      tasks = tasks.map(({ dueDate, ...others }) => ({
        ...others,
        dueDate: dueDate ? parseJSON(dueDate) : null,
      }));
      return new Project(name, color, id, tasks);
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

  function updateProject(id, projectAttributes) {
    const project = projects.find((project) => project.id === id);
    if (project === projects[0]) throw new Error("Cannot update inbox");
    // update project
    for(const [key, value] of Object.entries(projectAttributes)) {
      project[key] = value;
    }
    // save project to local storage
    _saveProjects();

    return project;
  }

  function deleteProject(id) {
    projects = projects.filter((project) => project.id !== id);
    // save project to local storage
    _saveProjects();
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

  function searchProjectById(id) {
    return projects.find(project => project.id === id);
  }

  function taskProject(id) {
    return projects.find((project) => project.tasks.find(task => task.id === id))
  }

  function updateTask(id, taskAttributes, newProject) {
    // find project
    const project = taskProject(id);
    // update task
    let task;
    if(newProject) {
      project.removeTask(id);
      task = newProject.addTask(taskAttributes);
    } else {
      task = project.updateTask(id, taskAttributes);
    }
    // save project to local storage
    _saveProjects();

    return task;
  }

  function deleteTask(id) {
    // find project
    const project = taskProject(id);
    // delete task
    project.removeTask(id);
    // save project to local storage
    _saveProjects();
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
    updateProject,
    deleteProject,
    addTask,
    searchProjectById,
    updateTask,
    deleteTask,
    taskProject,
    getTaskFromDate,
    get projects() {
      return projects;
    },
    get inbox() {
      return projects[0];
    }
  };
})();

export default todoList;
