import * as React from "react";

import { observer } from "mobx-react";
import { Panel, Button, PageHeader, Table, Modal } from "react-bootstrap";
import { IMainStore } from "../model/MainStore";
import { NewTaskForm } from "./NewTaskForm";
import { TaskItem } from "./TaskItem";

@observer
export class Main extends React.Component<{ store: IMainStore }, {}> {

    renderDeleteMessage() {
        if(this.props.store.taskToDelete !== null) {
            return (
                <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Delete task</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Do you really want to delete task: {this.props.store.taskToDelete.name}</Modal.Body>

                    <Modal.Footer>
                        <Button onClick={(e)=>this.props.store.cancelTaskDelete()}>Cancel</Button>
                        <Button onClick={(e)=>this.props.store.confirmTaskDelete()} bsStyle="primary">Delete</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                </div>
            );
        }
    }

    renderTasks() {
        if(this.props.store.taskList.length > 0) {
            return (
                <Table striped hover>
                    <thead>
                        <tr>
                        <th className="checkbox-col">
                            <br/>
                        </th>
                        <th><span className="header-cell-content">Task name</span></th>
                        <th className="task-time-col">
                            <span className="header-cell-content">Task time</span>
                        </th>
                        <th className="last-run-time-col">
                            <span className="header-cell-content">Last run time</span>
                        </th>
                        <th className="task-delete-col">
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.store.taskList
                            /*.slice().reverse()*/
                            .map((object, i) => <TaskItem task={object} key={i}/>)}
                    </tbody>
                </Table>
            );
        }
        else {
            return <Panel className="no-tasks-message-panel"> You have no any tasks yet </Panel>
        }
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <PageHeader>
                    My tiny awsome timetracker
                    </PageHeader>
                </Panel.Heading>

                <NewTaskForm store={this.props.store}/>
                {this.renderTasks()}
                {this.renderDeleteMessage()}
            </Panel>
        );
    }
}