import * as React from "react";
import {IAppState, ITaskState} from "./TaskInterfaces";
import {TaskAppearance} from "./TaskAppearance";
import {Helpers} from "./Helpers";

export class App extends React.Component<{}, IAppState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            currentTaskName: "",
            taskList: new Array<ITaskState>(),
            timerID: null,
        }
    }

    public componentDidMount(): void {
        const timerID = setInterval(() => this.tick(), 100);
        this.setState({timerID});
    }

    public componentWillUnmount(): void {
        clearInterval(this.state.timerID);
    }

    public tick(): void {

        const newTasks = this.state.taskList.slice();
        for (let i = 0; i < newTasks.length; i ++) {
            if (this.state.taskList[i].lastRunTime === 0)
                continue;

            const newTask = {...this.state.taskList[i] };
            newTask.timePassedSinceLastRunTime = Date.now() - newTask.lastRunTime;
            newTasks[i] = newTask;
        }

        this.setState({taskList: newTasks});
    }

    private getTaskOnTopIndex() : number {
        const taskList = this.state.taskList.slice();
        return taskList.map(e => e.guid).indexOf("");
    }

    public startStopTaskClickButton(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let taskList = this.state.taskList.slice();
        const indexOfTaskWithEmptyGuid = taskList.map(e => e.guid).indexOf("");

        if (indexOfTaskWithEmptyGuid !== -1) {
            taskList = this.stopTimerAndAssingGuidToNewTask(indexOfTaskWithEmptyGuid);
        }
        else {
            const newTask = this.CreateNewRunningTask();
            taskList.push(newTask);
        }

        this.setState({taskList});
    }

    public CreateNewRunningTask(): ITaskState {
        const newTask: ITaskState = {
            guid: "",
            lastRunTime: Date.now(),
            timeElapsed: 0,
            timePassedSinceLastRunTime: 0,
            title: this.state.currentTaskName,
            startPauseEvent: this.setTaskRunningButtonClick.bind(this),
            removeEvent: this.removeTaskOnClick.bind(this),
            renameTaskEvent: this.renameTaskEvent.bind(this),
        }
        return newTask;
    }

    public stopTimerAndAssingGuidToNewTask(indexOfExistingTask: number): Array<ITaskState> {
        const newTasks = this.setTaskRunningWithoutSave("", false);
        const existingTask = newTasks[indexOfExistingTask];
        existingTask.guid = Helpers.generateGuid();
        newTasks[indexOfExistingTask] = existingTask;
        return newTasks;
    }

    public topInputOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
        e.preventDefault();
        this.setState({currentTaskName: e.target.value})
    }

    public setTaskRunningButtonClick(e: React.MouseEvent<HTMLButtonElement>, guid: string, running: boolean): void {
        e.preventDefault();
        const newTasks = this.setTaskRunningWithoutSave(guid, running);
        this.setState({ taskList: newTasks });         
    }
    
    public setTaskRunningWithoutSave(guid: string, running: boolean): Array<ITaskState> {
        const newTasks = this.state.taskList.slice();
        const matchingIndex = newTasks.map(e => e.guid).indexOf(guid);

        const newTask = { ...newTasks[matchingIndex] };
        
        if (running) {
            newTask.lastRunTime = Date.now();
        }
        else {
            newTask.timeElapsed += newTask.timePassedSinceLastRunTime;
            newTask.lastRunTime =  0;
            newTask.timePassedSinceLastRunTime = 0;
        }
        newTasks[matchingIndex] = newTask;
       
        return newTasks;
    }

    public removeTaskOnClick(e: React.MouseEvent<HTMLButtonElement>, guid: string): void {
        e.preventDefault();
        const newTasks = this.state.taskList.filter(r => r.guid !== guid);
        this.setState({ taskList: newTasks });               
    }

    public renameTaskEvent(e: React.SyntheticEvent<HTMLElement>, guid: string, newTitle: string): void {
        e.preventDefault();
        const newTasks = this.state.taskList.slice();
        const matchingIndex = newTasks.map(e => e.guid).indexOf(guid);

        const currentEditableTask = { ...newTasks[matchingIndex] };
        currentEditableTask.title = newTitle;
        newTasks[matchingIndex] = currentEditableTask;

        this.setState({ taskList: newTasks });         
    }

    public generateTopTimer(taskOnTopIndex: number) : JSX.Element {

        var topTimer;

        if (taskOnTopIndex !== -1) {
            topTimer =
            <div className="input-group-append">
                <span>{Helpers.getPrettyfiedTime(this.state.taskList[taskOnTopIndex])}</span>
            </div>
        } else {
            topTimer = <div></div>
        }
        
        return topTimer;
    }

    public render(): JSX.Element {
        const taskOnTopIndex = this.getTaskOnTopIndex();
        const topTimer = this.generateTopTimer(taskOnTopIndex);
        const taskOnTopIsRunning = taskOnTopIndex !== -1 && this.state.taskList[taskOnTopIndex].timePassedSinceLastRunTime !== 0 ? true : false;

        return(
        <div className="row">
            <div className="col-sm-12">
                <form className="task-form">
                    <div className="form-group form-group--input">
                        <input type="text"
                        className="input-to-add-a-task"
                        value ={this.state.currentTaskName}
                        onChange={e => this.topInputOnChange(e)}
                        />            
                        {topTimer}                            
                    </div>
                    <div className="form-group form-group--button">
                        <button className={taskOnTopIsRunning ? 'button-red' : 'button-green'}
                        onClick={e => this.startStopTaskClickButton(e)}>
                            <i className={taskOnTopIsRunning ? "fa fa-pause" : "fa fa-play"}></i> {taskOnTopIsRunning ? 'Stop' : 'Start'}
                        </button>
                    </div>     
                </form>
                <section className="task-container">
                    {this.state.taskList.map((object, i) => object.guid !== "" ? <TaskAppearance {...object} key={i} /> : null )}
                </section>
            </div>
        </div>
        );
    }
}
