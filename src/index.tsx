import * as React from "react";
import * as ReactDOM from "react-dom";
import { Board } from "./components/Board";
import {taskStore} from "./TaskStore";
import "./index.css";

ReactDOM.render(
    <Board taskStore={taskStore} />,
    document.getElementById("board")
);
