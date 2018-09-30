import { observable } from "mobx";

export interface ITask{
    name: string;
    /* In seconds */
    timeAmount: number;
    lastRunTime: Date;
}

export class Task{
    @observable public name: string;
    /* In seconds */
    @observable public timeAmount: number;
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
        if (this.isRunning)
            return;
        this.timer = setInterval(() => {
            this.timeAmount += 1;
        }, 1000);
        this.isRunning = true;
        this.lastRunTime = new Date();
    }

    stop(){
        if (!this.isRunning)
            return;
        if (this.timer)
            clearInterval(this.timer);
        this.isRunning = false;
    }
}
