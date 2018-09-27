import * as React from "react";
import {TaskStore} from "../TaskStore";
import {observer} from "mobx-react";

export interface BoardProps { taskStore: TaskStore; }

@observer
export class Board extends React.Component<BoardProps, {}> {
    render() {
        const taskStore = this.props.taskStore;
        return (
        <div>
            <ul>
                { taskStore.tasks.map((task, idx) => <li>{task.name}</li>) }
            </ul>
        </div>);
    }
}
