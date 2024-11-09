import React from "react";
import { useState } from "react";

let id = 0;

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const removeTodo = (index) => {
    setTodos(todos.filter((todo) => todo.id !== index));
  };

  const addTodo = (todo) => {
    todo.length !== 0
      ? setTodos([
          ...todos,
          {
            id: id++,
            todo: todo,
          },
        ])
      : window.alert("Please enter something to add!");
  };

  const [editId, setEditId] = useState(null);
  const [updatedTodo, setUpdatedTodo] = useState("");

  const updateTodo = (id) => {
    if (updatedTodo.length !== 0) {
      const updatedTodos = todos.map((item) =>
        item.id === id ? { ...item, todo: updatedTodo } : item
      );
      setTodos(updatedTodos);
      setEditId(null);
      setUpdatedTodo("");
    } else {
      window.alert("Please enter something to update!");
    }
  };

  const clearAll = () => {
    setTodos([]);
    setUpdatedTodo("");
  };

  return (
    <div className="w-[90%] py-10 m-auto text-white">
      <div className="text-6xl font-bold text-center">To do</div>
      <div className="flex gap-4 justify-center py-4">
        <input
          className="text-left px-2 rounded-md py-2 text-black"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
        />
        <button
          className="border-2 px-4 rounded-md"
          onClick={() => {
            addTodo(todo);
            setTodo("");
          }}
        >
          Add
        </button>
        {todos.length !== 0 && (
          <button
            className="border-2 px-4 rounded-md"
            onClick={() => clearAll()}
          >
            Clear all
          </button>
        )}
      </div>

      <div className="text-xl text-center pt-4">To do items:</div>
      <div className="w-full pt-4">
        {todos.length !== 0 ? (
          todos.map((item) => (
            <div  key={item.id}>
              <div className="items-center flow-root">
                <span className="font-semibold text-xl float-left px-2 w-1/2">{`- ${item.todo}`}</span>
                <div className="float-right flex gap-4">
                  {editId === item.id ? (
                    <div className="flex gap-4">
                      <input
                        className="text-left px-2 rounded-md py-1 text-black"
                        type="text"
                        onChange={(e) => setUpdatedTodo(e.target.value)}
                      />
                      <button
                        className="border-2 px-4 rounded-md"
                        onClick={() => updateTodo(item.id)}
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="border-2 px-4 rounded-md"
                        onClick={() => setEditId(item.id)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                  <button
                    className="border-2 px-4 rounded-md"
                    onClick={() => removeTodo(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <hr className="my-2" />
            </div>
          ))
        ) : (
          <div className="text-center text-xl py-4">No todos to show !! Add some todos.</div>
        )}
      </div>
    </div>
  );
}

export default Todo;
