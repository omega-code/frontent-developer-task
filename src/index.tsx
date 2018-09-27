import * as React from "react";
import * as ReactDOM from "react-dom";
import { Board } from "./components/Board";
import {taskStore} from "./TaskStore";

ReactDOM.render(
    <Board taskStore={taskStore} />,
    document.getElementById("board")
);
