import React, { Component } from "react";
import PropTypes from "prop-types";
import NotesContext from "../NotesContext";
import NoteItem from "../NoteItem/NoteItem";
import "./NoteList.css";

class NoteList extends Component {
  static proptTypes = {
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
      })
    ),
  };

  static defaultProps = {
    notes: [],
  };

  static contextType = NotesContext;

  render() {
    const { notes } = this.context;
    return (
      <section className="NoteList">
        <h2>Your notes</h2>
        <div className="NoteList__list" aria-live="polite">
          {notes.map((note) => (
            <NoteItem key={note.id} {...note} />
          ))}
        </div>
      </section>
    );
  }
}

export default NoteList;
