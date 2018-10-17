import {ITaskState} from "./TaskInterfaces";

export abstract class Helpers {

    public static padNumber(num: number): string {
        return num.toLocaleString('en', { minimumIntegerDigits: 2 });
    }

    public static generateGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static getPrettyfiedTime(taskState: ITaskState): string {

        const addToTimer = taskState.lastRunTime === 0 ? 0 : Date.now();
        const date = new Date(taskState.timeElapsed + addToTimer - taskState.lastRunTime);

        const minutes = Helpers.padNumber(date.getMinutes());
        const seconds = Helpers.padNumber(date.getSeconds());
        const hours = Math.floor(date.getTime() / 1000 / 60 / 60);
        return `${hours}:${minutes}:${seconds}`;
    }
}