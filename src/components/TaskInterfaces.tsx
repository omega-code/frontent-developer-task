
export interface IAppState {
    currentTaskName: string;
    taskList: Array<ITaskState>;
    timerID: NodeJS.Timeout;
}

export interface ITaskState {
    timeElapsed: number;
    timePassedSinceLastRunTime: number;
    lastRunTime: number;
    title: string;
    guid: string;
    startPauseEvent: (e: React.MouseEvent<HTMLButtonElement>, guid: string, isRunning: boolean) => void;
    removeEvent: (e: React.MouseEvent<HTMLButtonElement>, guid: string) => void;
    renameTaskEvent: (e: React.SyntheticEvent<HTMLElement>, guid: string, newTitle: string) => void;
}

export interface ITaskAppearanceState {
    editing: boolean;
}