import { observable } from "mobx";
import { ITaskManager } from "./ITaskManager";

export interface ITaskItemStore {
    
    name : string;
    timeAmount: number;
    lastRunTime : Date;

    isActive : boolean;
    isTracking : boolean;

    /**
     * Set new name for the task
     * @param newName 
     */
    rename (newName : string);

    /**
     * If task is not tracking : start tracker
     * If task is tracking : stop track it
     * If another task is tracking : stop that and start this
     */
    toggleTracking();

    delete();
}

export class TaskItemStore implements ITaskItemStore {
    @observable name : string;
    @observable timeAmount: number;
    @observable lastRunTime : Date;
    @observable isActive : boolean;
    @observable isTracking : boolean;

    taskManager: ITaskManager;

    constructor(taskManager : ITaskManager) {
        this.taskManager = taskManager;
    }

    public rename(newName : string) {
        
        if(this.name === newName)
            return;
        
        this.name = newName;
    }

    public toggleTracking(){
        this.taskManager.toggleTaskTracking(this);
    }

    delete() {
        this.taskManager.requestTaskDelete(this);
    }

}