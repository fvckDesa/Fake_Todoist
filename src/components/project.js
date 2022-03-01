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

    deleteTodo(title){
        this.todos.splice(this.todos.indexOf(this.findTodo(title)), 1);
    }
}