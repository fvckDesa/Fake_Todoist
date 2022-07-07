import { format } from 'date-fns';

class Todo {
    constructor(title, description, dueDate, priority) {
        if(!(dueDate instanceof Date)) {
            throw new Error("Due date must be a Date object");
        }

        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, "d MMM");
        this.priority = priority;
    }
}

export default Todo;