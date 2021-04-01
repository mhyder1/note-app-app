import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import Rating from "../Rating/Rating";
import NotesContext from "../NotesContext";
import config from "../config";
import "./NoteItemTodo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { create } from "domain";

function editNote(noteId, noteTitle, e, noteDescription, context) {
  const id = noteId;
  const title = noteTitle;
  const notepad = e.innerText;
  const description = noteDescription;
  const newNote = { id, title, notepad, description };
  console.log(newNote);
  updateEndpoint(noteId, newNote, context);
}

function editNoteTitle(noteId, e, noteBody, noteDescription, context) {
  const id = noteId;
  const title = e.innerText;
  const notepad = noteBody;
  const description = noteDescription;
  const newNote = { id, title, notepad, description };
  console.log(newNote);
  updateEndpoint(noteId, newNote, context);
}

function updateEndpoint(noteId, newNote, context) {
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
      context.updateNote(newNote);
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

function createTodoArray(props) {
  console.log("Creating todo array");
  //   var todoArray = props.todo.split(",");
  var todoArray = props.todo.split(",");
  return todoArray;
}

export default function NoteItemTodo(props) {
  const context = useContext(NotesContext);
  const todos = context.todos;
  const todoarray = createTodoArray(props);
  return (
    <NotesContext.Consumer>
      {(todos) => (
        <div className="NoteItem">
          <h3
            contentEditable="true"
            className="NoteItem__title"
            onBlur={(e) =>
              editNoteTitle(
                props.id,
                e.target,
                props.notepad,
                props.description,
                context
              )
            }
          >
            {props.title}
            <i className=""></i>
          </h3>
          <ul>
            {todoarray.map((todo) => {
              return <li contentEditable>{todo}</li>;
            })}
          </ul>
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

NoteItemTodo.defaultProps = {
  onClickDelete: () => {},
};

NoteItemTodo.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  todo: PropTypes.string.isRequired,
  completed: PropTypes.string,
  onClickDelete: PropTypes.func,
};
