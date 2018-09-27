import {observable} from "mobx";
import {Task} from "./Task";

export class TaskStore {
    @observable tasks : Task[];
    @observable newTask : Task;

    constructor() {
        this.tasks = [
            new Task({name:"Do stuff", lastRunTime:new Date(), timeAmount:3601}),
            new Task({name:"Task2", lastRunTime:new Date(), timeAmount:64})
        ]
        this.newTask = new Task();
      }

    pushNewTask(){
        this.tasks.unshift(this.newTask);
        this.newTask = new Task();
    }

    removeTask(task: Task){
        task.stop();
        var index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
        else {
            throw new Error("Could not find task");
        }
    }
}

export const taskStore = new TaskStore();
