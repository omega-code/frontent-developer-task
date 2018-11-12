"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const react_bootstrap_1 = require("react-bootstrap");
require("./NewTaskForm.css");
let NewTaskForm = class NewTaskForm extends React.Component {
    constructor() {
        super(...arguments);
        this.onToggleButtonClicked = () => this.props.store.toggleTrackingCurrentTask();
        this.handleTaskNameChange = (e) => {
            this.props.store.currentTaskName = e.target.value;
        };
    }
    onKeyDown(e) {
        if (e.key == 'Enter') {
            this.props.store.toggleTrackingCurrentTask();
        }
    }
    ;
    render() {
        const { isTracking } = this.props.store;
        const currentTaskElapsedTime = new Date(1970, 1, 1, 0, 0, 0, 0);
        currentTaskElapsedTime.setSeconds(this.props.store.secondsElapsed);
        const button = React.createElement(react_bootstrap_1.Button, { className: "toggle-timer-button", onClick: this.onToggleButtonClicked }, isTracking ? "Stop" : "Start");
        return (React.createElement("div", { className: "input-wrapper" },
            React.createElement(react_bootstrap_1.FormGroup, { className: "new-task-form" },
                React.createElement(react_bootstrap_1.InputGroup, null,
                    React.createElement(react_bootstrap_1.FormControl, { className: "new-task-input", type: "text", value: this.props.store.currentTaskName, placeholder: "Enter task name", onChange: this.handleTaskNameChange, disabled: isTracking, onKeyDown: (e) => this.onKeyDown(e) }),
                    React.createElement(react_bootstrap_1.InputGroup.Button, null, button))),
            React.createElement("span", { className: "timer-text" }, currentTaskElapsedTime.toLocaleTimeString())));
    }
};
NewTaskForm = __decorate([
    mobx_react_1.observer
], NewTaskForm);
exports.NewTaskForm = NewTaskForm;
//# sourceMappingURL=NewTaskForm.js.map