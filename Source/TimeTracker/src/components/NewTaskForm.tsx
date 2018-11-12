import * as React from "react";

import { observer } from "mobx-react";
import { Panel, Button, FormGroup, FormControl, InputGroup } from "react-bootstrap";
import { IMainStore } from "../model/MainStore";

require("./NewTaskForm.css");

@observer
export class NewTaskForm extends React.Component<{ store: IMainStore }, {}> {

    private onToggleButtonClicked = () =>
        this.props.store.toggleTrackingCurrentTask();
    
    private handleTaskNameChange = (e) => {        
        this.props.store.currentTaskName = e.target.value;
    };

    private onKeyDown (e: React.KeyboardEvent<FormControl>){
        if (e.key == 'Enter') {
            this.props.store.toggleTrackingCurrentTask();
        }
    };

    public render() {
        const {isTracking} = this.props.store;
        const currentTaskElapsedTime = new Date(1970, 1, 1, 0,0,0,0);
        currentTaskElapsedTime.setSeconds( this.props.store.secondsElapsed );

        const button = <Button className="toggle-timer-button" onClick={this.onToggleButtonClicked}>{isTracking ? "Stop" : "Start"}</Button>

        return (
            <div className="input-wrapper">
                <FormGroup className="new-task-form">
                    <InputGroup>
                        <FormControl
                            className="new-task-input"
                            type="text"
                            value={this.props.store.currentTaskName}
                            placeholder="Enter task name"
                            onChange={this.handleTaskNameChange}
                            disabled={isTracking}
                            onKeyDown={(e) => this.onKeyDown(e)}
                        />
                        <InputGroup.Button>
                            {button}
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>

                <span className="timer-text"
                >{currentTaskElapsedTime.toLocaleTimeString()}</span>

            </div>
        );
    }
}