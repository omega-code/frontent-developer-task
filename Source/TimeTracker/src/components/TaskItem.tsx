import * as React from "react";
import { observer } from "mobx-react";
import { ITaskItemStore } from "../model/TaskItemStore";
import { observable } from "mobx";

@observer
export class TaskItem extends React.Component<{ task: ITaskItemStore }, {}> {

    initialTaskName : string;
    @observable editMode : boolean = false;

    private onItemTrackClicked() {
        this.props.task.toggleTracking();
    };

    private onTaskFieldKeyDown (e: React.KeyboardEvent<HTMLElement>){
        switch (e.key) {
            case 'Escape':
                this.cancelRenaming(e.currentTarget);
                e.currentTarget.blur();
                break;
            case 'Enter':
                e.currentTarget.blur();
                break;
        }
    };

    private cancelRenaming(taskNameField : HTMLElement){
        taskNameField.textContent = this.props.task.name;
    }

    private onTaskFieldFocusLost(taskNameField : HTMLElement){
        this.applyNewName(taskNameField);
        this.editMode = false;
    };

    private onTaskNameFocused(taskNameField : HTMLElement){
        this.applyNewName(taskNameField);
        this.editMode = true;
    };

    private applyNewName(taskNameField : HTMLElement){
        this.props.task.rename(taskNameField.textContent);
    }


    onItemDeleteClicked() {
        this.props.task.delete();
    }

    renderEmptyTaskWaterk(): React.ReactNode {
        if(this.props.task.name === "" && !this.editMode)
            return (
                <span className="empty-task-name-watermark">
                    [Untitled Task]
                </span>
            );
    }
    render() {
        const {name, timeAmount, lastRunTime, isTracking} = this.props.task;
        
        const taskTimeAmount = new Date(timeAmount * 1000);

        return (
            <tr>
            <td className="checkbox-col">
                <div className="cell-content">
                    {/* TRACK BUTTON */}
                    <span className="item-start-btn"
                        onClick={(e) => this.onItemTrackClicked()}>
                        <i className={isTracking ? "fa fa-pause" : "fa fa-play"}></i>
                    </span>
                </div>
            </td>
            <td>
                {/* TASK NAME FIELD*/}
                <div className="task-name-wrapper">
                    {this.renderEmptyTaskWaterk()}
                    <span className="cell-content">
                        <span contentEditable={!isTracking}
                                className="task-name-field"
                                onKeyDown={(e) => this.onTaskFieldKeyDown(e)}
                                onBlur={(e) => this.onTaskFieldFocusLost(e.target)}
                                onFocus={(e) => this.onTaskNameFocused(e.target)}
                                suppressContentEditableWarning={true}
                                >
                            {name}
                        </span>
                    </span>
                </div>
            </td>
            <td>
                {/* TASK TIME */}
                <span className="cell-content">
                        {taskTimeAmount.toISOString().substr(11, 8)}
                </span>
            </td>
            <td>
                {/* TASK LAST RUN */}
                <span className="cell-content">
                        {lastRunTime.toLocaleTimeString()}
                </span>    
            </td>

            <td className="task-delete-col">
                <div className="cell-content">
                    {/* DELETE BUTTON */}
                    <span className="item-delete-btn"
                        onClick={(e) => this.onItemDeleteClicked()}>
                        <i className="fa fa-trash"></i>
                    </span>
                </div>
            </td>

            </tr>
        );
    }
}