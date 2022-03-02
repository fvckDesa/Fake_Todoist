import "./document";
import Project from "./project";

const TodoList = (() => {
  const projects = {
    All:new Project("All")
  };

  function addProject(name){
    projects[name] = new Project(name);
  }

  function deleteProject(name){
    delete projects[name];
  }

  function getProject(name){
    return projects[name];
  }
  return { addProject, getProject, deleteProject }
})();

export default TodoList;