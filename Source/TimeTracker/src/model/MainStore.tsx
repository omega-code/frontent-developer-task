import { observable } from "mobx";
import { ITaskItemStore, TaskItemStore } from "./TaskItemStore";
import { ITaskManager } from "./ITaskManager";

export interface IMainStore {
    currentTaskName: string;
    secondsElapsed: number;
    isTracking: boolean;

    taskList: Array<ITaskItemStore>;
    taskToDelete: ITaskItemStore;

    toggleTrackingCurrentTask(): void;
    cancelTaskDelete() : void;
    confirmTaskDelete() : void;
}

class MainStore implements IMainStore, ITaskManager {
    
    @observable secondsElapsed: number = 0;
    @observable currentTaskName: string = "";
    @observable isTracking: boolean = false;

    @observable taskList: Array<ITaskItemStore> = [];
    @observable taskToDelete: ITaskItemStore = null;

    activeItem: ITaskItemStore = null;
    

    private timerId: NodeJS.Timeout;
    currentTaskStartTime: Date;

    public setItemActive(item: ITaskItemStore) {
        if (this.activeItem !== undefined && this.activeItem !== null) {
            this.activeItem.isActive = false;
        }

        item.isActive = true
        this.activeItem = item;

        this.currentTaskName = item.name;
    }

    public toggleTrackingCurrentTask() {
        if (this.isTracking) {
            this.stopCurrentTask();
        }
        else {
            this.startCurrentTask();
        }
    }

    public startCurrentTask() {
        this.secondsElapsed = 0;
        this.currentTaskStartTime = new Date();
        this.timerId = setInterval(() => {this.secondsElapsed += 1}, 1000);
        this.isTracking = true;

        if(!this.isNewTask()){
            this.activeItem.isTracking = true;
        }
    }

    public stopCurrentTask() {
        clearInterval(this.timerId);

        if (this.isNewTask()) {
            this.addNewTask();
        } else {
            this.updateCurrentTaskTime();
            this.activeItem.isTracking = false;
            this.activeItem.isActive = false;
            this.activeItem = null;
        }

        this.currentTaskName = "";
        this.isTracking = false;
        this.secondsElapsed = 0;
    }

    public addNewTask() {

        var endTime = new Date();

        var task = new TaskItemStore(this);
        task.name = this.currentTaskName;
        task.timeAmount = this.secondsElapsed;
        task.lastRunTime = this.currentTaskStartTime;
        task.isActive = false;

        this.taskList.push(task);

        console.log(this.taskList);
    }

    public toggleTaskTracking (task : ITaskItemStore) {
        
        if(!this.isNewTask() && this.isTracking){
            const justStopTracking = this.activeItem.name == task.name;
            this.stopCurrentTask();

            if(justStopTracking) return;
        }

        this.setItemActive(task);
        this.startCurrentTask()    
    }

    public requestTaskDelete(task : ITaskItemStore){
        this.taskToDelete = task;
    }

    public cancelTaskDelete(){
        this.taskToDelete = null;
    }
    
    public confirmTaskDelete(){
        const index = this.taskList.indexOf(this.taskToDelete, 0);
        if (index > -1) {
            this.taskList.splice(index, 1);
        }

        this.taskToDelete = null;
    }

    private updateCurrentTaskTime(){
        this.activeItem.timeAmount += this.secondsElapsed;
        this.activeItem.lastRunTime = this.currentTaskStartTime;
    }

    private isNewTask(): boolean {
        return this.activeItem === null || this.activeItem === undefined;
    }

}

export const mainStore: IMainStore = new MainStore();