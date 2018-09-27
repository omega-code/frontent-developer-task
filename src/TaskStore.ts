import {observable} from "mobx";
import {Task} from "./Task";

export class TaskStore {
	@observable tasks : Task[];

    constructor() {
        this.tasks = [new Task(
            {name:"Do stuff", lastRunTime:new Date(), timeAmount:10})]
      }
}

export const taskStore = new TaskStore();
