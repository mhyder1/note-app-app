import React from "react";
import ReactDOM from "react-dom";
import NoteList from "./NoteList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NoteList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
