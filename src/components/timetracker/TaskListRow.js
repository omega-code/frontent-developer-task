import React, {PropTypes} from 'react';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';

const TaskListRow = ({task, onSelect, onPlay, onStop, onDelete}) => {
    return  (
        <tr className={task.isSelected ? 'active' : ''}>
            <td onClick={onSelect}>{task.name}</td>
            <td onClick={onSelect}><Moment format="YYYY/MM/DD HH:mm:ss" date={task.lastRunTime} /></td>
            <td onClick={onSelect}>{task.timeAmount}</td>
            {!task.isRunning ? <td><Button bsStyle="primary" bsSize="sm" onClick={onPlay}>Play</Button></td> : null}
            {task.isRunning ? <td><Button bsStyle="warning" bsSize="sm" onClick={onStop}>Stop</Button></td> : null}
            <td><Button bsStyle="danger" bsSize="sm" onClick={onDelete}>Delete</Button></td>
        </tr>
    );
};

TaskListRow.propTypes = {
    task: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default TaskListRow;