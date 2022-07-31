import uniqueId from "../lib/unique-number-id.js";

class Task {
    constructor({ name, description, dueDate, id = uniqueId(), complete = false }) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.complete = complete;
        this.id = id;
    }
}

export default Task; 