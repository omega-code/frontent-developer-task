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
const mobx_1 = require("mobx");
let TaskItem = class TaskItem extends React.Component {
    constructor() {
        super(...arguments);
        this.editMode = false;
    }
    onItemTrackClicked() {
        this.props.task.toggleTracking();
    }
    ;
    onTaskFieldKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                this.cancelRenaming(e.currentTarget);
                e.currentTarget.blur();
                break;
            case 'Enter':
                e.currentTarget.blur();
                break;
        }
    }
    ;
    cancelRenaming(taskNameField) {
        taskNameField.textContent = this.props.task.name;
    }
    onTaskFieldFocusLost(taskNameField) {
        this.applyNewName(taskNameField);
        this.editMode = false;
    }
    ;
    onTaskNameFocused(taskNameField) {
        this.applyNewName(taskNameField);
        this.editMode = true;
    }
    ;
    applyNewName(taskNameField) {
        this.props.task.rename(taskNameField.textContent);
    }
    onItemDeleteClicked() {
        this.props.task.delete();
    }
    renderEmptyTaskWaterk() {
        if (this.props.task.name === "" && !this.editMode)
            return (React.createElement("span", { className: "empty-task-name-watermark" }, "[Untitled Task]"));
    }
    render() {
        const { name, timeAmount, lastRunTime, isTracking } = this.props.task;
        const taskTimeAmount = new Date(1970, 1, 1, 0, 0, 0, 0);
        taskTimeAmount.setSeconds(timeAmount);
        return (React.createElement("tr", null,
            React.createElement("td", { className: "checkbox-col" },
                React.createElement("div", { className: "cell-content" },
                    React.createElement("span", { className: "item-start-btn", onClick: (e) => this.onItemTrackClicked() },
                        React.createElement("i", { className: isTracking ? "fa fa-pause" : "fa fa-play" })))),
            React.createElement("td", null,
                React.createElement("div", { className: "task-name-wrapper" },
                    this.renderEmptyTaskWaterk(),
                    React.createElement("span", { className: "cell-content" },
                        React.createElement("span", { contentEditable: !isTracking, className: "task-name-field", onKeyDown: (e) => this.onTaskFieldKeyDown(e), onBlur: (e) => this.onTaskFieldFocusLost(e.target), onFocus: (e) => this.onTaskNameFocused(e.target), suppressContentEditableWarning: true }, name)))),
            React.createElement("td", null,
                React.createElement("span", { className: "cell-content" }, taskTimeAmount.toLocaleTimeString())),
            React.createElement("td", null,
                React.createElement("span", { className: "cell-content" }, lastRunTime.toLocaleTimeString())),
            React.createElement("td", { className: "task-delete-col" },
                React.createElement("div", { className: "cell-content" },
                    React.createElement("span", { className: "item-delete-btn", onClick: (e) => this.onItemDeleteClicked() },
                        React.createElement("i", { className: "fa fa-trash" }))))));
    }
};
__decorate([
    mobx_1.observable
], TaskItem.prototype, "editMode", void 0);
TaskItem = __decorate([
    mobx_react_1.observer
], TaskItem);
exports.TaskItem = TaskItem;
//# sourceMappingURL=TaskItem.js.map