import * as React from "react";

interface IAppState {
    currentTaskName: string;
    taskList: Array<ITaskState>;
    timerID: NodeJS.Timeout;
}

export class App extends React.Component<object, IAppState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            currentTaskName: "",
            taskList: new Array<ITaskState>(),
            timerID: null,
        }
    }

    public componentDidMount(): void {
        var timerID = setInterval(() => this.tick(), 100);
        this.setState({timerID});
    }

    public componentWillUnmount(): void {
        clearInterval(this.state.timerID);
    }

    public tick(): void {

        var newTasks = this.state.taskList.slice();
        for (var i = 0; i < newTasks.length; i ++) {
            if (this.state.taskList[i].lastRunTime === 0)
                continue;

            let newTask = {...this.state.taskList[i] };
            newTask.timePassedSinceLastRunTime = Date.now() - newTask.lastRunTime;
            newTasks[i] = newTask;
        }

        this.setState({taskList: newTasks});
    }

    private getTaskOnTopIndex() : number {
        var taskList = this.state.taskList.slice();
        return taskList.map(e => e.guid).indexOf("");
    }

    public startStopTaskClickButton(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        var taskList = this.state.taskList.slice();
        var indexOfTaskWithEmptyGuid = taskList.map(e => e.guid).indexOf("");

        if (indexOfTaskWithEmptyGuid !== -1) {
            taskList = this.stopTimerAndAssingGuidToNewTask(indexOfTaskWithEmptyGuid);
        }
        else {
            var newTask = this.CreateNewRunningTask();
            taskList.push(newTask);
        }

        this.setState({taskList});
    }

    public CreateNewRunningTask(): ITaskState {
        var newTask: ITaskState = {
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
        var newTasks = this.setTaskRunningWithoutSave("", false);
        var existingTask = newTasks[indexOfExistingTask];
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
        var newTasks = this.setTaskRunningWithoutSave(guid, running);
        this.setState({ taskList: newTasks });         
    }
    
    public setTaskRunningWithoutSave(guid: string, running: boolean): Array<ITaskState> {
        var newTasks = this.state.taskList.slice();
        var matchingIndex = newTasks.map(e => e.guid).indexOf(guid);

        var newTask = { ...newTasks[matchingIndex] };
        
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
        var newTasks = this.state.taskList.filter(r => r.guid !== guid);
        this.setState({ taskList: newTasks });               
    }

    public renameTaskEvent(e: React.SyntheticEvent<HTMLElement>, guid: string, newTitle: string): void {
        e.preventDefault();
        var newTasks = this.state.taskList.slice();
        var matchingIndex = newTasks.map(e => e.guid).indexOf(guid);

        var currentEditableTask = { ...newTasks[matchingIndex] };
        currentEditableTask.title = newTitle;
        newTasks[matchingIndex] = currentEditableTask;

        this.setState({ taskList: newTasks });         
    }



    public render(): JSX.Element {
        var topTimer: JSX.Element;
        var taskOnTopIndex = this.getTaskOnTopIndex();
        var taskOnTopIsRunning = taskOnTopIndex !== -1 && this.state.taskList[taskOnTopIndex].timePassedSinceLastRunTime !== 0 ? true : false;


        if (taskOnTopIndex !== -1) {
            topTimer =
            <div className="input-group-append">
                <span>{Helpers.getPrettyfiedTime(this.state.taskList[taskOnTopIndex])}</span>
            </div>
        } else {
            topTimer = <div></div>
        }

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


interface ITaskState {
    timeElapsed: number;
    timePassedSinceLastRunTime: number;
    lastRunTime: number;
    title: string;
    guid: string;
    startPauseEvent: (e: React.MouseEvent<HTMLButtonElement>, guid: string, isRunning: boolean) => void;
    removeEvent: (e: React.MouseEvent<HTMLButtonElement>, guid: string) => void;
    renameTaskEvent: (e: React.SyntheticEvent<HTMLElement>, guid: string, newTitle: string) => void;
}

interface ITaskAppearanceState {
    editing: boolean;
}

class TaskAppearance extends React.Component<ITaskState, ITaskAppearanceState> {

    constructor(props: ITaskState) {
        super(props);
        
        this.state = {
            editing: false,
        };
    }

    public renderTitle(title: string): string {
        return title.length === 0 ? '<Untitled Task>' : title;
    }

    public edit(element: HTMLElement): void {
        this.setState({editing: true}, () => element.focus());
    }

    public cancel(element: HTMLElement): void {
        this.setState({editing: false});
        element.textContent = this.renderTitle(this.props.title);
    }

    public toggleEdit(e: React.SyntheticEvent<HTMLElement>): void {
        e.stopPropagation();
        if (this.state.editing) {
            this.cancel(e.currentTarget);
        }
        else {
            this.edit(e.currentTarget);
        }
    }

    public save(e: React.SyntheticEvent<HTMLElement>): void {
        this.props.renameTaskEvent(e, this.props.guid, e.currentTarget.textContent)
        this.setState({editing: false});
    }

    public handleKeyDown(e: React.KeyboardEvent<HTMLElement>): void {

        switch (e.key) {
            case 'Enter':
                this.save(e);
                break;
            case 'Escape':
                this.cancel(e.currentTarget);
                break;
        }
    }

    public render(): JSX.Element {
        var isRunning = this.props.lastRunTime !== 0;
        var editing = this.state.editing;
        return (
            <div>
                <span onClick={e => this.toggleEdit(e)}
                className={editing ? 'editing' : ''}
                contentEditable={editing}
                onKeyDown={(e) => this.handleKeyDown(e)}
                suppressContentEditableWarning={true}
                onBlur={(e) => this.save(e)}
                >
                    {this.renderTitle(this.props.title)}
                </span>
                <span > : {Helpers.getPrettyfiedTime(this.props)}</span>
                <button className={isRunning ? 'button-red' : 'button-green'} onClick={e => this.props.startPauseEvent(e, this.props.guid, !isRunning)}><i className={isRunning ? "fa fa-pause" : "fa fa-play"}></i>{ isRunning ? 'Stop' : 'Start'}
                </button>           
                <button className="button-red" onClick={e => this.props.removeEvent(e, this.props.guid)}><i className="fa fa-minus-circle" aria-hidden="true"></i>Remove</button>
            </div>
        );
    }
}

abstract class Helpers {

    public static padNumber(num: number): string {
        return num.toLocaleString('en', { minimumIntegerDigits: 2 });
    }

    public static generateGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static getPrettyfiedTime(taskState: ITaskState): string {

        var addToTimer = taskState.lastRunTime === 0 ? 0 : Date.now();
        var date = new Date(taskState.timeElapsed + addToTimer - taskState.lastRunTime);

        var minutes = Helpers.padNumber(date.getMinutes());
        var seconds = Helpers.padNumber(date.getSeconds());
        var hours = Math.floor(date.getTime() / 1000 / 60 / 60);
        return `${hours}:${minutes}:${seconds}`;
    }

}

