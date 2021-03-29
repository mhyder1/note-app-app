import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddNote from "./AddNote/AddNote";
import EditNote from "./EditNote/EditNote";
import NoteList from "./NoteList/NoteList";
import NotesContext from "./NotesContext";
import Nav from "./Nav/Nav";
import config from "./config";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSmile, faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSmile,
  faImage,
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell
);

class App extends Component {
  state = {
    notes: [],
    error: null,
  };

  setNotes = (notes) => {
    this.setState({
      notes,
      error: null,
    });
  };

  AddNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter((bm) => bm.id !== noteId);
    this.setState({
      notes: newNotes,
    });
  };

  addNewNote = () => {
    const newNote = {
      title: "New Note",
      notepad: "Add new text",
      description: "",
    };
    this.setState({
      notes: [...this.state.notes, newNote],
    });

    fetch(config.API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${config.API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res.json();
      })
      .then((data) => {
        this.context.AddNote(data);
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res.json();
      })
      .then(this.setNotes)
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  updateNote = (updatedNote) => {
    this.setState({
      notes: this.state.notes.map((bm) =>
        bm.id !== updatedNote.id ? bm : updatedNote
      ),
    });
  };

  render() {
    const contextValue = {
      notes: this.state.notes,
      AddNote: this.AddNote,
      deleteNote: this.deleteNote,
      updateNote: this.updateNote,
    };
    return (
      <main className="App">
        <div id="header">
          <button id="addNoteBtn" onClick={this.addNewNote}>
            +
          </button>
          <p id="appTitle">Notes App</p>
        </div>
        <NotesContext.Provider value={contextValue}>
          <div className="content" aria-live="polite">
            <Route exact path="/" component={NoteList} />
            <Route path="/add-note" component={AddNote} />
            <Route path="/edit/:noteId" component={EditNote} />
          </div>
        </NotesContext.Provider>
      </main>
    );
  }
}

export default App;
