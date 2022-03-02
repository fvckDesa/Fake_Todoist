import './document';
import { format } from 'date-fns';

class Todo {
    constructor(title, description, dueDate, priority = false){
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, 'dd-MM-yyyy');
        this.priority = priority;
    }
}

export default Todo;