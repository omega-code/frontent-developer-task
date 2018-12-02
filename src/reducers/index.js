import {combineReducers} from 'redux';
import tasks from './timeTrackerReducer';

const rootReducer = combineReducers({
    tasks
});

export default rootReducer;