import * as React from "react";
import {TaskStore} from "../TaskStore";
import {observer} from "mobx-react";
import {FormControl} from "react-bootstrap";
import {convertToNiceTimeString} from "../TimeSpanHelpers";
const styles = require("./HeadTaskForm.css");

@observer
export class HeadTaskForm extends React.Component<{taskStore: TaskStore}, {}> {

    render() {
        const taskStore = this.props.taskStore;
        const headTask = taskStore.headTask;
        const isRunning = headTask && headTask.isRunning;
        return (
            <div className={styles.taskForm}>
                <div className={`${styles.taskFormCol} ${styles.taskNameCol}`}>
                    <FormControl
                        type="text"
                        placeholder="Name your task"
                        value={(headTask) ? headTask.name : ""}
                        onChange={this.handleRename}
                        className={styles.taskNameTextbox}
                    />
                </div>
                <div className={`${styles.taskFormCol} ${styles.timeCol}`}>
                    {convertToNiceTimeString((headTask) ? headTask.timeAmount : 0)}
                </div>
                <div className={`${styles.taskFormCol} ${styles.buttonCol}`}>
                    <a onClick={this.handleClick} 
                        className={`${styles.timerButton}
                        ${isRunning ? styles.stopButton : styles.startButton}`}>
                        {isRunning ? "Stop" : "Start"}
                    </a>
                </div>
            </div>
        );
    }

    handleClick = (e: any) => {
        let taskStore = this.props.taskStore;
        let headTask = taskStore.headTask;
        if (headTask && headTask.isRunning){
            taskStore.stopRunningTask();
        }
        else {
            taskStore.startNewTask();
        }
    }

    handleRename = (e: React.FormEvent<FormControl>) => {
        const {name, value} = e.target as HTMLInputElement;
        this.props.taskStore.changeHeadTaskName(value);
    }
}
