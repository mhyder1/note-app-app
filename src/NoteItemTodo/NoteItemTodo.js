import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import Rating from "../Rating/Rating";
import NotesContext from "../NotesContext";
import config from "../config";
import "./NoteItemTodo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//get state

// function editNote(noteId, noteTitle, e, noteDescription, context) {
//   const id = noteId;
//   const title = noteTitle;
//   const notepad = e.innerText;
//   const description = noteDescription;
//   const newNote = { id, title, notepad, description };
//   console.log(newNote);
//   updateEndpoint(noteId, newNote, context);
// }

// function editNoteTitle(noteId, e, noteBody, noteDescription, context) {
//   const id = noteId;
//   const title = e.innerText;
//   const notepad = noteBody;
//   const description = noteDescription;
//   const newNote = { id, title, notepad, description };
//   console.log(newNote);
//   updateEndpoint(noteId, newNote, context);
// }

// function updateEndpoint(noteId, newNote, context) {
//   console.log("Updating todo");
//   console.log(newNote);
//   fetch(config.API_ENDPOINT + `todo/${noteId}`, {
//     method: "PATCH",
//     body: JSON.stringify(newNote),
//     headers: {
//       "content-type": "application/json",
//       authorization: `Bearer ${config.API_KEY}`,
//     },
//   })
//     .then((res) => {
//       if (!res.ok) return res.json().then((error) => Promise.reject(error));
//     })
//     .then(() => {
//       //this.resetFields(newNote);
//       context.updateNote(newNote);
//       //this.props.history.push("/");
//     })
//     .catch((error) => {
//       console.error(error);
//       //this.setState({ error });
//     });
// }

function deleteNoteRequest(noteId, cb) {
  fetch(config.API_ENDPOINT + `todo/${noteId}`, {
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

function deleteTodoItem(elementId, todoArray, note, context) {
  todoArray.splice(elementId, 1);
  document.getElementById("item_" + elementId).style.display = "none";
  const id = note.id;
  const title = note.title;
  var todo = "";
  todoArray.map((item) => {
    todo = todo + item + ",";
  });
  todo.slice(0, -1);
  const completed = true;
  const newTodo = { id, title, todo, completed };
  // updateEndpoint(note.id, newTodo, context);
}

function createTodoArray(props) {
  if (props.todo == null) return;
  let arr = props.todo.split(",");
  return arr;
}

// function addNewLine(event, todoArray, index, id) {
//   if (event.code == "Enter") {
//     console.log(event.target.innerText);
//     todoArray[index] = event.target.innerText;
//     console.log(todoArray);
//     let todos = todoArray.join(",");
//     // const firstTodo = document.getElementById("firstTodo").innerText;
//     context.editTodoTitle();
//   }
// }

export default function NoteItemTodo(props) {
  const context = useContext(NotesContext);
  // const todos = context.todos;
  const [todoArray, setTodoArray] = useState(createTodoArray(props))

  if (todoArray == null) {
    // todoArray = [];
    setTodoArray([])
  }

  function addNewLine(event, index) {
    
    if (event.code == "Enter") {
      todoArray[index] = event.target.innerText || '';
      console.log(todoArray);
      setTodoArray(todoArray)
      let todos = todoArray.join(",");
      context.editTodoTitle(props.id, props.title, todos);
    }
  }

  const addItem = () => {
    setTodoArray([...todoArray,''])
  }

  return (
    <div className="NoteItem">
      {/* {props.id} */}
      <h3
        contentEditable="true"
        className="NoteItem__title"
        onBlur={(e) =>
          context.editTodoTitle(
            props.id,
            e.target.innerText,
            props.notepad,
            props.description
          )
        }
      >
        {props.title}
        <i className=""></i>
      </h3>
      <ul id="todolist">
        {
          todoArray.map((todo, index) => {
            return (
              <li id={"item_" + index}>
                  <p
                    className="todocontent single-line "
                    contentEditable="true"
                    onKeyPress={(e) => 
                      addNewLine(e, index)
                    }
                    id="otherTodos"
                  >
                    {todo}
                  </p>
                <p className="del-todo">
                  <FontAwesomeIcon
                    icon={["fas", "times"]}
                    className="fa-icon delete-todo"
                    onClick={() =>
                      deleteTodoItem(index, todoArray, props, context)
                    }
                  />
                </p>
              </li>
            );
          })
        }
      </ul>
      <div className="NoteItem__buttons todo_buttons">
        <FontAwesomeIcon
          icon={["fas", "plus"]}
          className="fa-icon"
          onClick={addItem}
        />
        <FontAwesomeIcon
          icon={["fas", "trash"]}
          className="fa-icon"
          onClick={() => deleteNoteRequest(props.id, context.deleteNote)}
        />
      </div>
    </div>
  );
}

NoteItemTodo.defaultProps = {
  onClickDelete: () => {},
};

NoteItemTodo.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  todo: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onClickDelete: PropTypes.func,
};
