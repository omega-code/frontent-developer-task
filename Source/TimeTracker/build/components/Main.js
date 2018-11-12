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
const NewTaskForm_1 = require("./NewTaskForm");
const TaskItem_1 = require("./TaskItem");
let Main = class Main extends React.Component {
    renderDeleteMessage() {
        if (this.props.store.taskToDelete !== null) {
            return (React.createElement("div", { className: "static-modal" },
                React.createElement(react_bootstrap_1.Modal.Dialog, null,
                    React.createElement(react_bootstrap_1.Modal.Header, null,
                        React.createElement(react_bootstrap_1.Modal.Title, null, "Delete task")),
                    React.createElement(react_bootstrap_1.Modal.Body, null,
                        "Do you really want to delete task: ",
                        this.props.store.taskToDelete.name),
                    React.createElement(react_bootstrap_1.Modal.Footer, null,
                        React.createElement(react_bootstrap_1.Button, { onClick: (e) => this.props.store.cancelTaskDelete() }, "Cancel"),
                        React.createElement(react_bootstrap_1.Button, { onClick: (e) => this.props.store.confirmTaskDelete(), bsStyle: "primary" }, "Delete")))));
        }
    }
    renderTasks() {
        if (this.props.store.taskList.length > 0) {
            return (React.createElement(react_bootstrap_1.Table, { striped: true, hover: true },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", { className: "checkbox-col" },
                            React.createElement("br", null)),
                        React.createElement("th", null,
                            React.createElement("span", { className: "header-cell-content" }, "Today")),
                        React.createElement("th", { className: "task-time-col" },
                            React.createElement("span", { className: "header-cell-content" }, "Task time")),
                        React.createElement("th", { className: "last-run-time-col" },
                            React.createElement("span", { className: "header-cell-content" }, "Last run time")),
                        React.createElement("th", { className: "task-delete-col" }))),
                React.createElement("tbody", null, this.props.store.taskList
                    /*.slice().reverse()*/
                    .map((object, i) => React.createElement(TaskItem_1.TaskItem, { task: object, key: i })))));
        }
        else {
            return React.createElement(react_bootstrap_1.Panel, { className: "no-tasks-message-panel" }, " You have no any tasks yet ");
        }
    }
    render() {
        return (React.createElement(react_bootstrap_1.Panel, null,
            React.createElement(react_bootstrap_1.Panel.Heading, null,
                React.createElement(react_bootstrap_1.PageHeader, null, "My tiny awsome timetracker")),
            React.createElement(NewTaskForm_1.NewTaskForm, { store: this.props.store }),
            this.renderTasks(),
            this.renderDeleteMessage()));
    }
};
Main = __decorate([
    mobx_react_1.observer
], Main);
exports.Main = Main;
//# sourceMappingURL=Main.js.map