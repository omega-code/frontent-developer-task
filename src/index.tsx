import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import "./styles/style.scss";

const ROOT = document.querySelector(".container");

ReactDOM.render(<App />, ROOT);