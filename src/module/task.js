import { format } from 'date-fns';

class Task {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, "d MMM");
        this.complete = false;
    }
}

export default Task; 