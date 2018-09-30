import * as React from "react";
import { Task } from "../Task";
import { TaskStore, taskStore } from "../TaskStore";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Row, Col, Button, Glyphicon, Form, FormControl, ButtonToolbar } from "react-bootstrap";
import { convertToTimeString } from "../TimeSpanHelpers";
const styles = require("./TaskItem.css");

export interface TaskProps {
    task: Task;
    taskStore: TaskStore;
}

@observer
export class TaskItem extends React.Component<TaskProps, {}> {
    @observable isEditing: boolean;

    render() {
        const task = this.props.task;

        return (
            <Row className={`show-grid ${styles.taskListRow} ${task.isRunning ? styles.runningTaskText : ""}`}>
                <Col sm={1}>
                    <Button onClick={this.handleTimerClick}>
                        <Glyphicon glyph={task.isRunning ? "stop" : "play"} />
                    </Button>
                </Col>
                <Col sm={4}>
                    <p className={styles.taskName}
                        style={{ display: !this.isEditing ? "inline" : "none" }}>
                        {task.name}
                    </p>
                    <Form
                        action="javascript:void(0);"
                        style={{ display: this.isEditing ? "inline" : "none" }}>
                        <FormControl
                            type="text"
                            placeholder="Name your task"
                            value={task.name}
                            onChange={this.handleRename}
                            className={styles.taskNameTextbox}
                        />
                    </Form>
                </Col>
                <Col sm={1}>
                    <Button onClick={this.handleEditClick}>
                        <Glyphicon glyph={this.isEditing ? "floppy-disk" : "pencil"} />
                    </Button>
                </Col>
                <Col sm={2}>
                    {convertToTimeString(task.timeAmount)}
                </Col>
                <Col sm={3}>
                    {task.lastRunTime.toLocaleString()}
                </Col>
                <Col sm={1}>
                    <Button onClick={this.handleRemoveClick}>
                        <Glyphicon glyph="remove" />
                    </Button>
                </Col>
            </Row>
        );
    }

    handleRename = (e: React.FormEvent<FormControl>) => {
        const { name, value } = e.target as HTMLInputElement;
        this.props.task.name = value;
    }

    handleTimerClick = () => {
        this.isEditing = false;
        let task = this.props.task;
        if (task.isRunning) {
            taskStore.stopRunningTask();
        }
        else {
            taskStore.startSavedTask(task);
        }
    }

    handleRemoveClick = () => {
        this.isEditing = false;
        this.props.taskStore.removeTask(this.props.task);
    }

    handleEditClick = () => {
        this.isEditing = !this.isEditing;
    }
}