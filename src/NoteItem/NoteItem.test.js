import React from "react";
import ReactDOM from "react-dom";
import NoteItem from "./NoteItem";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NoteItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
