"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const TaskItemStore_1 = require("./TaskItemStore");
class MainStore {
    constructor() {
        this.secondsElapsed = 0;
        this.currentTaskName = "";
        this.isTracking = false;
        this.taskList = [];
        this.taskToDelete = null;
        this.activeItem = null;
    }
    setItemActive(item) {
        if (this.activeItem !== undefined && this.activeItem !== null) {
            this.activeItem.isActive = false;
        }
        item.isActive = true;
        this.activeItem = item;
        this.currentTaskName = item.name;
    }
    toggleTrackingCurrentTask() {
        if (this.isTracking) {
            this.stopCurrentTask();
        }
        else {
            this.startCurrentTask();
        }
    }
    startCurrentTask() {
        this.secondsElapsed = 0;
        this.currentTaskStartTime = new Date();
        this.timerId = setInterval(() => { this.secondsElapsed += 1; }, 1000);
        this.isTracking = true;
        if (!this.isNewTask()) {
            this.activeItem.isTracking = true;
        }
    }
    stopCurrentTask() {
        clearInterval(this.timerId);
        if (this.isNewTask()) {
            this.addNewTask();
        }
        else {
            this.updateCurrentTaskTime();
            this.activeItem.isTracking = false;
            this.activeItem.isActive = false;
            this.activeItem = null;
        }
        this.currentTaskName = "";
        this.isTracking = false;
        this.secondsElapsed = 0;
    }
    addNewTask() {
        var endTime = new Date();
        var task = new TaskItemStore_1.TaskItemStore(this);
        task.name = this.currentTaskName;
        task.timeAmount = this.secondsElapsed;
        task.lastRunTime = this.currentTaskStartTime;
        task.isActive = false;
        this.taskList.push(task);
        console.log(this.taskList);
    }
    toggleTaskTracking(task) {
        if (!this.isNewTask() && this.isTracking) {
            const justStopTracking = this.activeItem.name == task.name;
            this.stopCurrentTask();
            if (justStopTracking)
                return;
        }
        this.setItemActive(task);
        this.startCurrentTask();
    }
    requestTaskDelete(task) {
        this.taskToDelete = task;
    }
    cancelTaskDelete() {
        this.taskToDelete = null;
    }
    confirmTaskDelete() {
        const index = this.taskList.indexOf(this.taskToDelete, 0);
        if (index > -1) {
            this.taskList.splice(index, 1);
        }
        this.taskToDelete = null;
    }
    updateCurrentTaskTime() {
        this.activeItem.timeAmount += this.secondsElapsed;
        this.activeItem.lastRunTime = this.currentTaskStartTime;
    }
    isNewTask() {
        return this.activeItem === null || this.activeItem === undefined;
    }
}
__decorate([
    mobx_1.observable
], MainStore.prototype, "secondsElapsed", void 0);
__decorate([
    mobx_1.observable
], MainStore.prototype, "currentTaskName", void 0);
__decorate([
    mobx_1.observable
], MainStore.prototype, "isTracking", void 0);
__decorate([
    mobx_1.observable
], MainStore.prototype, "taskList", void 0);
__decorate([
    mobx_1.observable
], MainStore.prototype, "taskToDelete", void 0);
exports.mainStore = new MainStore();
//# sourceMappingURL=MainStore.js.map