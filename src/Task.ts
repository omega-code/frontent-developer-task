import { observable } from "mobx";

export interface ITask{
    name: string;
    timeAmount: number; // seconds
    lastRunTime: Date;
}

export class Task{
    @observable public name: string;
    @observable public timeAmount: number; // seconds
    @observable public lastRunTime: Date;
    @observable public isRunning: boolean;

    private timer: NodeJS.Timer;

    constructor(obj : ITask = {name:"", timeAmount:0, lastRunTime:new Date(-1)}) {    
        this.name = obj.name;
        this.timeAmount = obj.timeAmount;
        this.lastRunTime = obj.lastRunTime;
        this.isRunning = false;
    }

    start(){
        this.timer = setInterval(() => {
            this.timeAmount += 1;
        }, 1000);
        this.isRunning = true;
        this.lastRunTime = new Date();
    }

    stop(){
        if (this.timer)
            clearInterval(this.timer);
        this.isRunning = false;
    }
}
