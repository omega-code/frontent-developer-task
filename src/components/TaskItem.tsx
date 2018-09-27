import * as React from "react";
import {Task} from "../Task";
import {TaskStore} from "../TaskStore";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {Row, Col, Button, Glyphicon, Form, FormControl} from "react-bootstrap";
import {ConvertToTimeString} from "../DateTimeHelper";

export interface TaskProps {
    task: Task;
    taskStore: TaskStore;
}

@observer
export class TaskItem extends React.Component<TaskProps, {}> {
    @observable isEditing : boolean;

    render() {
        const task = this.props.task;
        
        return (
            <Row className="show-grid">
                <Col xs={2} md={8}>
                    <Button onClick={this.onStopStartClick}>
                        <Glyphicon glyph={task.isRunning ? "stop" : "play" } />
                    </Button>
                </Col>
                <Col xs={10} md={8}>
                    <span style={{visibility: !this.isEditing ? 'visible' : 'hidden' }}>
                        {task.name}
                    </span>
                    <Form style={{visibility: this.isEditing ? 'visible' : 'hidden' }}>
                        <FormControl 
                            type="text" 
                            placeholder="Name your task"
                            value={task.name}
                            onChange={this.onRename} 
                        />
                    </Form>
                    <Button onClick={this.onEditClick}>
                        <Glyphicon glyph={this.isEditing ? "floppy-disk" : "pencil" } />
                    </Button>
                    <Button onClick={this.onRemoveClick}>
                        <Glyphicon glyph="remove" />
                    </Button>
                </Col>
                <Col xs={2} md={2}>
                    {ConvertToTimeString(task.timeAmount)}
                </Col>
                <Col xs={2} md={2}>
                    {task.lastRunTime.toLocaleString()}
                </Col>
            </Row>
        );
    }

    onRename = (e: React.FormEvent<FormControl>) => {
        const {name, value} = e.target as HTMLInputElement;
        this.props.task.name = value;
    }

    onStopStartClick = () => {
        let task = this.props.task;
        if (task.isRunning){
            task.stop();
        }
        else{
            task.start();
        }
    }

    onRemoveClick = () => {
        this.props.taskStore.removeTask(this.props.task);
    }

    onEditClick = () => {
        this.isEditing = !this.isEditing;
    }
}