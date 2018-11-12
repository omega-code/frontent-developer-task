"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
class TaskItemStore {
    constructor(taskManager) {
        this.taskManager = taskManager;
    }
    rename(newName) {
        if (this.name === newName)
            return;
        this.name = newName;
    }
    toggleTracking() {
        this.taskManager.toggleTaskTracking(this);
    }
    delete() {
        this.taskManager.requestTaskDelete(this);
    }
}
__decorate([
    mobx_1.observable
], TaskItemStore.prototype, "name", void 0);
__decorate([
    mobx_1.observable
], TaskItemStore.prototype, "timeAmount", void 0);
__decorate([
    mobx_1.observable
], TaskItemStore.prototype, "lastRunTime", void 0);
__decorate([
    mobx_1.observable
], TaskItemStore.prototype, "isActive", void 0);
__decorate([
    mobx_1.observable
], TaskItemStore.prototype, "isTracking", void 0);
exports.TaskItemStore = TaskItemStore;
//# sourceMappingURL=TaskItemStore.js.map