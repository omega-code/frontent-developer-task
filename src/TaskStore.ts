import {observable} from "mobx";
import {Task} from "./Task";

export class TaskStore {
    @observable taskList : Task[];
    /** Задача, отображаемая вверху страницы, - новая или запущенная из списка */
    @observable headTask : Task;

    constructor() {
        this.taskList = [
            // new Task({name:"Do stuff", lastRunTime:new Date(), timeAmount:64}),
            // new Task({name:"Kill Bill", lastRunTime:new Date(), timeAmount:703652})
        ];
        this.headTask = null;
    }

    startNewTask(){
        if (!this.headTask) this.headTask = new Task();
        this.headTask.start();
    }

    changeHeadTaskName(name: string){
        if (!this.headTask) this.headTask = new Task();
        this.headTask.name = name;
    }

    stopRunningTask(){
        let headTask = this.headTask;
        if (!headTask || !headTask.isRunning) return;
        headTask.stop();
        let index = this.taskList.indexOf(headTask);
        if (index <= -1) this.saveNewTask();
        this.headTask = null;
    }

    saveNewTask(){
        this.taskList.unshift(this.headTask);
    }

    startSavedTask(task : Task){
        let taskList = this.taskList;
        if (taskList.indexOf(task) <= -1){
            throw new Error("Could not find task");
        }
        let headTask = this.headTask;
        if (headTask && headTask.isRunning){
            headTask.stop();
            if (taskList.indexOf(headTask) <= -1) this.saveNewTask();
        }
        this.headTask = task;
        task.start();
    }

    removeTask(task: Task){
        let taskList = this.taskList;
        let index = taskList.indexOf(task);
        if (index > -1) {
            task.stop();
            if (task === this.headTask) this.headTask = null;
            taskList.splice(index, 1);
        }
        else {
            throw new Error("Could not find task");
        }
    }
}

export const taskStore = new TaskStore();
