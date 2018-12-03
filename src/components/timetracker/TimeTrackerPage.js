import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as timeTrackerActions from '../../actions/timeTrackerActions';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import {v4} from 'uuid';

class TimeTrackerPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            task: Object.assign({}, props.task),
            newTask: true
        };

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.updateTaskState = this.updateTaskState.bind(this);
        this.renameTask = this.renameTask.bind(this);
        this.restartTask = this.restartTask.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({task: Object.assign({}, nextProps.task), newTask: nextProps.newTask});
    }

    startTimer() {
        let taskToStart =  { id: v4(), name: this.state.task.name, timeAmount: 0 };
        this.props.actions.startTimeTracker(taskToStart);
    }

    stopTimer() {
        this.stopTask(this.state.task);
    }

    isRunningTask(tasks) {
        if(!tasks || tasks.length === 0) {
            return false;
        }
        const runningTasks = tasks.filter(task => task.isRunning);
        return runningTasks.length > 0;
    }

    updateTaskState(event) {
        const field = event.target.name;
        const task = Object.assign({}, this.state.task);
        task[field] = event.target.value;
        return this.setState({task: task});
    }

    selectTask(task) {
        this.props.actions.selectTask(task);
    }

    restartTask(task) {
        this.props.actions.restartTask(task);
    }

    stopTask(task) {
        this.props.actions.stopTask(task);
    }

    deleteTask(task) {
        this.props.actions.deleteTask(task);
    }

    renameTask(task) {
        this.props.actions.renameTask(task);
    }

    cancel() {
        this.setState({task: {}, newTask: true});
    }

    render() {
        return (
            <div>
                <TaskForm task={this.state.task} 
                    isRunningTask={this.isRunningTask(this.props.tasks)}
                    newTask={this.state.newTask}
                    onRename={() => this.renameTask(this.state.task)}
                    onChange={this.updateTaskState}
                    onStart={this.startTimer}
                    onRestart={() => this.restartTask(this.state.task)}
                    onStop={this.stopTimer}
                    onCancel={this.cancel}
                    />
                <div>
                    <TaskList tasks={this.props.tasks}
                        onSelect={(task) => this.selectTask(task)}
                        onPlay={(task) => this.restartTask(task)}
                        onStop={(task) => this.stopTask(task)}
                        onDelete={(task) => this.deleteTask(task)} />
                </div>
            </div>
        );
    }
}

TimeTrackerPage.propTypes = {
    task: PropTypes.object.isRequired, 
    tasks: PropTypes.array.isRequired,
    newTask: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    let selectedTasks = state.tasks.filter(task => task.isSelected);
    return {
        tasks: state.tasks,
        task: selectedTasks && selectedTasks.length > 0 ? selectedTasks[0] : {id: v4(), name: '', timeAmount: 0},
        newTask: !(selectedTasks && selectedTasks.length > 0)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(timeTrackerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTrackerPage);