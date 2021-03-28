import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import Rating from "../Rating/Rating";
import NotesContext from "../NotesContext";
import config from "../config";
import "./NoteItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function editNote(noteId, noteTitle, e, noteDescription) {
  const id = noteId;
  const title = noteTitle;
  const notepad = e.innerText;
  const description = noteDescription;
  const newNote = { id, title, notepad, description };
  console.log(newNote);
  fetch(config.API_ENDPOINT + `/${noteId}`, {
    method: "PATCH",
    body: JSON.stringify(newNote),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${config.API_KEY}`,
    },
  })
    .then((res) => {
      if (!res.ok) return res.json().then((error) => Promise.reject(error));
    })
    .then(() => {
      //this.resetFields(newNote);
      this.context.updateNote(newNote);
      //this.props.history.push("/");
    })
    .catch((error) => {
      console.error(error);
      //this.setState({ error });
    });
}

function deleteNoteRequest(noteId, cb) {
  fetch(config.API_ENDPOINT + `/${noteId}`, {
    method: "DELETE",
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
      cb(noteId);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default function NoteItem(props) {
  return (
    <NotesContext.Consumer>
      {(context) => (
        <div className="NoteItem">
          <h3 contentEditable="true" className="NoteItem__title">
            {props.title}
            <i className=""></i>
          </h3>
          <p
            contentEditable="true"
            className="NoteItem_body"
            onBlur={(e) =>
              editNote(props.id, props.title, e.target, props.description)
            }
          >
            {props.notepad}
          </p>

          <p className="NoteItem__description">{props.description}</p>
          <div className="NoteItem__buttons">
            {/* <Link to={`/edit/${props.id}`}>Edit</Link>{" "} */}
            {/* <button
              className="NoteItem__description"
              onClick={() => deleteNoteRequest(props.id, context.deleteNote)}
            >
              Delete
            </button> */}
            <FontAwesomeIcon
              icon={["fas", "trash"]}
              className="fa-icon"
              onClick={() => deleteNoteRequest(props.id, context.deleteNote)}
            />
          </div>
        </div>
      )}
    </NotesContext.Consumer>
  );
}

NoteItem.defaultProps = {
  onClickDelete: () => {},
};

NoteItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  notepad: PropTypes.string.isRequired,
  desciption: PropTypes.string,

  onClickDelete: PropTypes.func,
};
