import Todo from './todo';

class Project {
    constructor(name, todos = []) {
        this.name = name;
        this.todos = todos;
    }

    addTodo(title, description, dueDate, priority) {
        this.todos.push(title, description, dueDate, priority);
    }
}

export default Project;