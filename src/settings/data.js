import Icons from "../assets/icons";
import todoList from "../module/todo-list";

export const defaultSettings = {
  theme: "todoist",
  autoDarkMode: true,
  homeView: todoList.today.id,
  timeFormat: "H:mm",
  dateFormat: "d-MMM-yyyy",
  weekStart: 1,
  nextWeek: 1,
  weekend: 6
}

export const settingsType = [
    {
        setting: "general",
        icon: Icons.General,
    },
    {
        setting: "theme",
        icon: Icons.Theme
    }
];

export const homeViewEls = [
  {
    txt: "Today",
    value: todoList.today.id,
    group: false,
  },
  {
    label: "Projects",
    get els() {
      return todoList.projects.map(({ name, id }) => ({ txt: name, value: id }))
    },
    group: true,
  }
];