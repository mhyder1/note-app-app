import React from "react";

const NotesContext = React.createContext({
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
  updateNote: () => {},
});

export default NotesContext;
