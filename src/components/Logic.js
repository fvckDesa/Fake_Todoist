import { Todo } from "./todo";
import { Project } from "./project";
import "../module/document";

const message = [
  "0. esc",
  "1. add project",
  "2. add todo",
  "3. delete todo",
  "4. show all project",
  "5. show all todos in a project",
  "6. delete project",
  "7. change project",
];

const projects = { All: new Project("All") };

let cmd;

console.log("\n\n\n");

do {
  console.log(message.join("\n\n"));
  cmd = +prompt("inserire comando") ?? 0;
  switch (cmd) {
    case 0:
      console.log("bay bay");
      break;
    case 1:
      addProject();
      break;
    case 2:
      addTodo();
      break;
    case 3:
      deleteTodo();
      break;
    case 4:
      showAllProject();
      break;
    case 5:
      showAllTodosInProject();
      break;
    case 6:
      deleteProject();
      break;
    case 7:
      changeProject();
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

function addTodo() {
  const nameProject2 = prompt("inserire nome progetto");
  const todoInfos = [
    prompt("title"),
    prompt("description"),
    prompt("data scadenza"),
    confirm("priority"),
  ];
  const [title, description, dueDate, priority] = todoInfos;
  projects[nameProject2].addTodos(
    new Todo(title, description, dueDate, priority)
  );
}

function deleteTodo() {
  const nameProject3 = prompt("inserire nome progetto");
  const todo = prompt("title todo");
  projects[nameProject3].deleteTodo(todo);
}

function showAllProject() {
  for (const [name, project] of Object.entries(projects)) {
    console.log(name, project);
  }
}

function showAllTodosInProject() {
  const nameProject4 = prompt("inserire nome progetto");
  const todos = projects[nameProject4].todos;
  for (const todo of todos) {
    console.log(todo);
  }
  if (todos.length === 0) {
    console.log("this project is empty");
  }
}

function deleteProject() {
  const nameProject5 = prompt("inserire nome progetto");
  delete projects[nameProject5];
}

function changeProject() {
  const nameProject = prompt("inserire nome progetto");
  let cmd;
  do {
    console.log("0. esc\n\n1. change project name\n\n2. chenge todo");
    cmd = +prompt("inserire comando");
    switch (cmd) {
      case 0:
        console.log("esc to change project");
        break;
      case 1:
        const newName = prompt("new name project");
        projects[nameProject].name = newName;
        projects.changeKey(nameProject, newName);
        break;
      case 2:
        changeTodo(nameProject);
      default:
        console.log("comando non trovato");
        break;
    }
  } while (cmd !== 0);
}

function changeTodo(nameProject) {
  const todos = projects[nameProject].todos;
  for (let i = 0; i < todos.length; i++) {
    console.log(`${i}. ${todos[i].title}`);
  }

  let num;
  do {
    num = +prompt("Select todo");
    if (num < 0 && num > todos.length - 1) {
      console.log("select valid todo");
    }
  } while (num < 0 && num > todos.length - 1);

  const todoSelect = todos[num];

  const options = [
    "0. esc",
    "1. change title",
    "2. change description",
    "3. change dueDate",
    "4. change priority",
  ];

  let cmd;

  do {
    console.log(options.join("\n\n"));
    cmd = +prompt("inserire comando");

    switch (cmd) {
      case 0:
        console.log("esc to change todo");
        break;
      case 1:
        todoSelect.title = prompt("new title");
        break;
      case 2:
        todoSelect.description = prompt("new description");
        break;
      case 3:
        todoSelect.dueDate = prompt("new due date");
        break;
      case 4:
        todoSelect.priority = confirm("priority");
        break;

      default:
        console.log("comando non trovato");
        break;
    }
  } while (cmd !== 0);
}
