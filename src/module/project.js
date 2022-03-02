import Todo from './todo';

class Project {
    constructor(name){
        this.name = name;
        this.todos = [];
    }

    addTodo(title, description, dueDate, priority = false){
        this.todos.push(new Todo(title, description, dueDate, priority));
    }

    findTodo(title){
        return this.todos.find((todo) => todo.title === title);
    }

    deleteTodo(todo){
        this.todos.splice(this.todos.indexOf(todo), 1);
    }
}

export default Project;