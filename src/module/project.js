import Task from './task';
import uniqueId from '../lib/unique-number-id';

class Project {
    constructor(name, color = "", id = uniqueId(), tasks = []) {
        this.name = name;
        this.color = color;
        this.tasks = tasks;
        this.id = id;
    }

    addTask(taskAttributes) {
        const task = new Task(taskAttributes);
        this.tasks.push(task);
        return task;
    }

    updateTask(id, taskAttributes) {
        const task = this.tasks.find(task => task.id === id);
        for(const [key, value] of Object.entries(taskAttributes)) {
            task[key] = value;
        }
        return task;
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    filterTask(callback) {
        return this.tasks.filter(callback);
    }
}

export default Project;