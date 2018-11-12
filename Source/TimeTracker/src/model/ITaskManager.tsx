import { ITaskItemStore } from "./TaskItemStore";

export interface ITaskManager {
    
    toggleTaskTracking (task : ITaskItemStore);

    requestTaskDelete(task : ITaskItemStore);

}
