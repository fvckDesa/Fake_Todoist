export class Project {
    constructor(name){
        this.name = name;
        this.todos = [];
    }

    addTodos(...todos){
        this.todos.push(...todos);
    }

    findTodo(title){
        return this.todos.find((todo) => todo.title === title);
    }

    deleteTodo(todo){
        this.todos.splice(this.todos.indexOf(todo), 1);
    }
}