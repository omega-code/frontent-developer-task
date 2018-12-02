import React, {PropTypes} from 'react';
import TaskListRow from './TaskListRow';

const TaskList = ({tasks, onSelect, onPlay, onStop, onDelete}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>LastRunTime</th>
                    <th>TimeAmount (ms)</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tasks
                    .slice()
                    .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map(task => 
                        <TaskListRow key={task.id} task={task} onSelect={() => onSelect(task)}
                            onPlay={() => onPlay(task)}
                            onStop={() => onStop(task)}
                            onDelete={() => onDelete(task)} />
                    )}
            </tbody>
        </table>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default TaskList;
