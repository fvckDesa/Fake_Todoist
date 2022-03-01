import '../module/document';
import { format } from 'date-fns';

export class Todo {
    constructor(title, description, dueDate, priority = false){
        this.title = title;
        this.description = description;
        this.dueDate = /* format(dueDate, 'dd-MM-yyyy') */ dueDate;
        this.priority = priority;
    }

    getInfo(info) {
        if(!info) throw new Error('Info undefined');
        return this[info];
    }
}