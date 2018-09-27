export class Task{
    public name: string;
    public timeAmount: number; // seconds
    public lastRunTime: Date;

    public constructor(init?:Partial<Task>) {
        Object.assign(this, init);
    }
}
