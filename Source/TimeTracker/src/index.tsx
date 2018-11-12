import * as React from "react";
import * as ReactDOM from "react-dom";

import "font-awesome/css/font-awesome.css";

import "./styles/style.css";

import { mainStore } from "./model/MainStore";
import { Main } from "./components/Main";

function handleClick() {
    console.log("Clicked!");
}

ReactDOM.render(
    <Main store={mainStore} />,
    document.getElementById("app")
);