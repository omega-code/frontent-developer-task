import * as React from "react";
import {TaskStore} from "../TaskStore";
import {observer} from "mobx-react";
import {Grid} from "react-bootstrap";
import {TaskItem} from "./TaskItem"
import {HeadTaskForm} from "./HeadTaskForm";
const styles = require("./Board.css");

@observer
export class Board extends React.Component<{taskStore: TaskStore}, {}> {

    render() {
        const taskStore = this.props.taskStore;
        return (
            <div className={styles.board}>
                <HeadTaskForm taskStore={taskStore} />
                <Grid className={styles.taskList}>
                    {taskStore.taskList.map((task, idx) => <TaskItem task={task} taskStore={taskStore} key={idx} />)}
                </Grid>
            </div>
        );
    }
}
