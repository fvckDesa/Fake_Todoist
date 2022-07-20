import Task from './task';

class Project {
    constructor(name, color = "", tasks = []) {
        this.name = name;
        this.color = color;
        this.tasks = tasks;
    }

    addTask(title, description, dueDate, priority) {
        this.tasks.push(title, description, dueDate, priority);
    }

    filterTask(callback) {
        return this.tasks.filter(callback);
    }
}

export default Project;