import todoList from "./todo-list";
import Project from "./project";
import { overdueFilter, todayFilter } from "../utils/filters";

const today = (() => {
  const todayId = localStorage.getItem("today-id");
  const project = new Project("Today");

  if(todayId) project.id = +todayId;
  else localStorage.setItem("today-id", project.id);

  return {
    ...project,
    get tasks() {
      return todoList.projects.reduce((acc, project) => {
        return [
          ...acc,
          ...project.filterTask(overdueFilter),
          ...project.filterTask(todayFilter),
        ];
      }, []);
    },
    filterTask(cb) {
      return this.tasks.filter(cb);
    },
  };
})();

export default today;
