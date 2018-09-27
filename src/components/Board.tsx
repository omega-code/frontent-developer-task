import * as React from "react";
import {TaskStore} from "../TaskStore";
import {Task} from "../Task";
import {observer} from "mobx-react";
import {Grid,Form,FormControl,Button} from "react-bootstrap";
import {TaskItem} from "./TaskItem"
import {ConvertToTimeString} from "../DateTimeHelper";

@observer
export class Board extends React.Component<{taskStore: TaskStore}, {}> {

    render() {
        const taskStore = this.props.taskStore;
        const newTask = taskStore.newTask;
        return (
            <div>
                <Form inline>
                    <FormControl 
                        type="text" 
                        placeholder="Name your task"
                        value={newTask.name}
                        onChange={this.onRename} 
                    />
                    <FormControl.Static>{ConvertToTimeString(taskStore.newTask.timeAmount)}</FormControl.Static>
                    <Button onClick={this.onClick}>{newTask.isRunning ? "Stop" : "Start"}</Button>
                </Form>
                <Grid>
                    { taskStore.tasks.map((task, idx) => <TaskItem task={ task } key={ idx }/>) }
                </Grid>
            </div>
        );
    }

    onClick = (event: any) => {
        let taskStore = this.props.taskStore;
        let task = taskStore.newTask;
        if (!task.isRunning) {
            task.start();
        }
        else {
            task.stop();
            taskStore.pushNewTask();
        }
    }

    onRename = (e: React.FormEvent<FormControl>) => {
        const {name, value} = e.target as HTMLInputElement;
        this.props.taskStore.newTask.name = value;
    }
}
