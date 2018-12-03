import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function  timeTrackerReducer(state = initialState.tasks, action) {
    switch(action.type) {
        case types.LOAD_TASKS_SUCCESS:
            return action.tasks;

        case types.START_TIME_TRACKER: {
            let otherTasks = state.filter(task => task.id !== action.task.id).map(task => {
                return Object.assign({}, task, {isSelected: false});
            });

            return  [
                ...otherTasks,
                Object.assign({}, action.task, 
                    { 
                        lastRunTime: new Date(), 
                        startsAt: new Date(), 
                        isRunning: true,
                        isSelected: true,
                        createdAt: new Date()
                    })
            ];
        }
        
        case types.STOP_TIME_TRACKER: {
            return  [
                ...state.filter(task => task.id !== action.task.id),
                Object.assign({}, action.task)
            ];
        }

        case types.RENAME_TASK: {
            return  [
                ...state.filter(task => task.id !== action.task.id),
                action.task
            ];
        }

        case types.DELETE_TASK: {
            return  [
                ...state.filter(task => task.id !== action.task.id)
            ];
        }

        case types.SELECT_TASK: {
            // TODO: need to remove this smelly piece of ... :)
            const otherTasks = state.filter(task => task.id !== action.task.id).map(task => {
                return Object.assign({}, task, {isSelected: false});
            });
            
            return  [
                ...otherTasks,
                Object.assign({}, action.task, {isSelected: true})
            ];
        }

        case types.RESTART_TASK: {
            const otherTasks = state.filter(task => task.id !== action.task.id).map(task => {
                return Object.assign({}, task, {isSelected: false});
            });

            return  [
                ...otherTasks,
                Object.assign({}, action.task, 
                    { 
                        lastRunTime: new Date(), 
                        startsAt: new Date(), 
                        isRunning: true,
                        isSelected: true
                    })
            ];
        }
        
        case types.STOP_TASK: {
            const otherTasks = state.filter(task => task.id !== action.task.id).map(task => {
                return Object.assign({}, task, {isSelected: task.isRunning});
            });

            const taskEndsAt = new Date();
            const diff = Math.abs(taskEndsAt - action.task.startsAt);
            return  [
                ...otherTasks,
                Object.assign({}, action.task, 
                    {
                        timeAmount: action.task.timeAmount + diff, 
                        endsAt: taskEndsAt.toString(), 
                        isRunning: false,
                        isSelected: false
                    })
            ];
        }

        default:
            return state;
    }
}