import * as types from './actionTypes';
import taskApi from '../api/mockTasksApi';

export function loadTasksSuccess(tasks) {
    return { type: types.LOAD_TASKS_SUCCESS, tasks };
}


export function startTimeTrackerSuccess(task) {
    return { type: types.START_TIME_TRACKER, task };
}

export function stopTimeTrackerSuccess(task) {
    return { type: types.STOP_TIME_TRACKER, task };
}

export function restartTaskSuccess(task) {
    return { type: types.RESTART_TASK, task };
}

export function stopTaskSuccess(task) {
    return { type: types.STOP_TASK, task };
}

export function renameTaskSuccess(task) {
    return { type: types.RENAME_TASK, task };
}

export function deleteTaskSuccess(task) {
    return { type: types.DELETE_TASK, task };
}

export function selectTaskSuccess(task) {
    return { type: types.SELECT_TASK, task };
}


export function startTimeTracker(task) {
    return function(dispatch) {
        dispatch(startTimeTrackerSuccess(task));
    };
}

export function stopTimeTracker(task) {
    return function(dispatch) {
        dispatch(stopTimeTrackerSuccess(task));
    };
}

export function restartTask(task) {
    return function(dispatch) {
        dispatch(restartTaskSuccess(task));
    };
}

export function stopTask(task) {
    return function(dispatch) {
        dispatch(stopTaskSuccess(task));
    };
}


export function renameTask(task) {
    return function(dispatch) {
        dispatch(renameTaskSuccess(task));
    };
}

export function deleteTask(task) {
    return function(dispatch) {
        dispatch(deleteTaskSuccess(task));
    };
}

export function selectTask(task) {
    return function(dispatch) {
        dispatch(selectTaskSuccess(task));
    };
}

export function loadTasks() {
    return function(dispatch) {
        return taskApi.getAllTasks().then(tasks => {
            dispatch(loadTasksSuccess(tasks));
        }).catch(error => {
            throw(error);
        });
    };
}