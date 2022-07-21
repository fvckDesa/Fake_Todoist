import Task from './task';

class Project {
    constructor(name, color = "", tasks = []) {
        this.name = name;
        this.color = color;
        this.tasks = tasks;
    }

    addTask(taskAttributes) {
        const task = new Task(taskAttributes);
        this.tasks.push(task);
        return task;
    }

    filterTask(callback) {
        return this.tasks.filter(callback);
    }
}

export default Project;