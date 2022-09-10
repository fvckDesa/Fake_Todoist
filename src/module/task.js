import uniqueId from "../lib/unique-number-id.js";

class Task {
    constructor({ name, description = "", dueDate = null, id = uniqueId(), complete = false, priority = 4 }) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.complete = complete;
        this.id = id;
        this.priority = priority;
    }
}

export default Task; 