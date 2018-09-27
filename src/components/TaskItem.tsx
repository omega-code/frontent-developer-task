import * as React from "react";
import {Task} from "../Task";
import {observer} from "mobx-react";
import {Row, Col} from "react-bootstrap";
import {ConvertToTimeString} from "../DateTimeHelper";

@observer
export class TaskItem extends React.Component<{task: Task}, {}> {
    render() {
        const task = this.props.task;
        return (
            <Row className="show-grid">
                <Col xs={12} md={8}>
                    {task.name}
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
}