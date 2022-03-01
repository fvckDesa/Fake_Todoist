import { Todo } from "./todo";
import { Project } from "./project";
import "../module/document";

const options = [
  "0. esc",
  "1. add project",
  "2. delete project",
  "3. show all project",
  "4. show all todos in a project",
  "5. change project",
];
const todos = [];
for (let i = 0; i < 10; i++) {
  todos.push(new Todo(`todo${i}`));
}

const projects = { All: new Project("All") };
projects.All.addTodos(...todos);

let cmd;

console.log("\n\n\n");

do {
  console.log(options.join("\n\n"));
  cmd = +prompt("inserire comando") ?? 0;
  switch (cmd) {
    case 0:
      console.log("bay bay");
      break;
    case 1:
      addProject();
      break;
    case 2:
      deleteProject();
      break;
    case 3:
      showAllProject();
      break;
    case 4:
      showAllTodos(prompt("inserire nome progetto"));
      break;
    case 5:
      changeProject(prompt("inserire nome progetto"));
      break;
    default:
      console.log("comando non trovato");
      break;
  }
} while (cmd !== 0);

function addProject() {
  const nameProject1 = prompt("inserire nome progetto");
  projects[nameProject1] = new Project(nameProject1);
}

function deleteProject() {
  showAllProject();
  const nameProject5 = prompt("inserire nome progetto");
  delete projects[nameProject5];
}

function showAllProject() {
  for (const [name, project] of Object.entries(projects)) {
    console.log(name, project);
  }
  if (projects.lenght === 0) {
    console.log("No project add one");
  }
}

function showAllTodos(nameProject) {
  const todos = projects[nameProject].todos;
  for (let i = 0; i < todos.length; i++) {
    console.log(i, todos[i]);
  }
  if (todos.length === 0) {
    console.log("this project is empty");
  }
}

function changeProject(nameProject) {
  const options = [
    "0. esc",
    "1. change name",
    "2. add todo",
    "3. delete todo",
    "4. change todo",
    "5. show all todos in this project",
  ];

  let cmd;

  do {
    console.log(options.join("\n\n"));
    cmd = +prompt("inserire comando");
    switch (cmd) {
      case 0:
        console.log("esc to change project");
        break;
      case 1:
        changeProjectName(nameProject);
        break;
      case 2:
        addTodo(nameProject);
        break;
      case 3:
        deleteTodo(nameProject);
        break;
      case 4:
        changeTodo(nameProject);
        break;
      case 5:
        showAllTodos(nameProject);
        break;
      default:
        console.log("comando non trovato");
        break;
    }
  } while (cmd !== 0);
}

function changeProjectName(nameProject) {
  const newName = prompt("new name project");
  projects[nameProject].name = newName;
  projects.changeKey(nameProject, newName);
}

function addTodo(nameProject) {
  const [title, description, dueDate, priority] = [
    prompt("title"),
    prompt("description"),
    prompt("data scadenza"),
    confirm("priority"),
  ];
  projects[nameProject].addTodos(
    new Todo(title, description, dueDate, priority)
  );
  projects["All"].addTodos(new Todo(title, description, dueDate, priority));
}

function deleteTodo(nameProject) {
  const todo = selectTodo(nameProject);
  projects[nameProject].deleteTodo(todo);
  projects["All"].deleteTodo(todo);
}

function selectTodo(nameProject) {
  const todos = projects[nameProject].todos;

  showAllTodos(nameProject);

  let n;
  do {
    n = +prompt("Inserire numero todo");
    if (n < 0 && n > todos.length - 1) {
      console.log("Inserire un numero valido");
    }
  } while (n < 0 && n > todos.length - 1);

  return todos[n];
}

function changeTodo(nameProject) {
  const options = [
    "0. esc",
    "1. change title",
    "2. change description",
    "3. change dueDate",
    "4. change priority",
  ];

  const todo = selectTodo(nameProject);
  const todoInAll = projects["All"].findTodo(todo.title);
  let cmd;

  do {
    console.log(options.join("\n\n"));
    cmd = +prompt("inserire comando");

    switch (cmd) {
      case 0:
        console.log("esc to change todo");
        break;
      case 1:
        const newTitle = prompt("new title");
        todo.title = newTitle;
        todoInAll.title = newTitle;
        break;
      case 2:
        const newDescription = prompt("new description");
        todo.description = newDescription;
        todoInAll.description = newDescription;
        break;
      case 3:
        const newDueDate = prompt("new due date");
        todo.dueDate = newDueDate;
        todoInAll.dueDate = newDueDate;
        break;
      case 4:
        const newPriority = confirm("priority");
        todo.priority = newPriority;
        todoInAll.priority = newPriority;
        break;

      default:
        console.log("comando non trovato");
        break;
    }
  } while (cmd !== 0);
}
