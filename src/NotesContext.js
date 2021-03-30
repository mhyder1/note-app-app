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
});

export default NotesContext;
