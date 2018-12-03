import React from 'react';
import TextInput from '../common/TextInput';
import { Button } from 'react-bootstrap';

const TaskForm = ({isRunningTask, task, newTask, onChange, onStart, onRestart, onStop, onRename, onCancel}) => {
    return (
        <div>
            <TextInput name="name" label="task name" placeholder="<task name>"
                value={task.name}
                onChange={onChange}
                />
            {!newTask ? <Button bsStyle="warning" onClick={onRename}>Rename</Button> : null}
            {!isRunningTask && newTask ? <Button bsStyle="success" onClick={onStart}>Start</Button> : null}
            {!isRunningTask && !newTask? <Button bsStyle="success" onClick={onRestart}>Restart</Button> : null}
            {!isRunningTask && !newTask ? <Button bsStyle="success" onClick={onCancel}>Cancel</Button> : null}
            {isRunningTask ? <Button bsStyle="danger" onClick={onStop}>Stop</Button> : null}
        </div>
    );
};

TaskForm.propTypes = {
    task: React.PropTypes.object.isRequired,
    newTask: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onStart: React.PropTypes.func.isRequired,
    onRestart: React.PropTypes.func.isRequired,
    onStop: React.PropTypes.func.isRequired,
    onRename: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    isRunningTask: React.PropTypes.bool.isRequired
};

export default TaskForm;

