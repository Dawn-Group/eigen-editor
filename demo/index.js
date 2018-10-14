import React from "react";
import ReactDOM from "react-dom";
import "../dist/styles/main.css";

import EigenEditor from "../dist";
const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<EigenEditor/>, root);