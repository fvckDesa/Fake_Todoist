import { format } from 'date-fns';

class Task {
    constructor({ name, description, dueDate }) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate ? format(dueDate, "d MMM") : undefined;
        this.complete = false;
    }
}

export default Task; 