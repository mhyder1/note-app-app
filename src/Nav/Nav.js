import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav className="Nav">
      <Link to={"/"}>Note List</Link> <Link to={"/add-Note"}>Add Note</Link>
    </nav>
  );
}
