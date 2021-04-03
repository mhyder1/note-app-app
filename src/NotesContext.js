import React from "react";

const NotesContext = React.createContext({
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
  updateNote: () => {},
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},

  // dlete list added so
});

export default NotesContext;
