import { useState, useEffect } from "react";
import axios from "axios";

export const Todo = () => {
  const [todos, setTodos] = useState();
  const [newTodo, setNewTodo] = useState("");
  useEffect(() => {
    axios
      .get("/todos", {
        baseURL: "https://pre-onboarding-selection-task.shop",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
    console.log(todos);
  });
  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="new-todo-input"
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button data-testid="new-todo-add-button">추가</button>
      </div>
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 1</span>
        </label>
        <button data-testid="modify-button">수정</button>
        <button data-testid="delete-button">삭제</button>
      </li>
    </div>
  );
};
