"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
//import DevTools from "mobx-react-devtools";
//import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-4-theme/dist/bootstrap-theme.min.css";
require("font-awesome/css/font-awesome.css");
require("./styles/style.css");
const MainStore_1 = require("./model/MainStore");
const Main_1 = require("./components/Main");
function handleClick() {
    console.log("Clicked!");
}
ReactDOM.render(React.createElement(Main_1.Main, { store: MainStore_1.mainStore }), document.getElementById("app"));
//# sourceMappingURL=index.js.map