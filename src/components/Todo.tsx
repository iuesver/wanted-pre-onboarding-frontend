import { useState, useEffect, useRef } from "react";
import axios from "axios";
interface todo {
  id: number;
  isCompleted: boolean;
  todo: string;
  userId: number;
}

export const Todo = () => {
  const [todos, setTodos] = useState<todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [updateTarget, setUpdateTarget] = useState<todo>({
    id: 0,
    isCompleted: false,
    todo: "",
    userId: 0,
  });
  const [updateStr, setUpdateStr] = useState<string>("");
  const addTodoRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    axios
      .get("/todos", {
        baseURL: "https://pre-onboarding-selection-task.shop",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="new-todo-input"
          ref={addTodoRef}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button
          data-testid="new-todo-add-button"
          onClick={() => {
            axios
              .post(
                "/todos",
                { todo: newTodo },
                {
                  baseURL: "https://pre-onboarding-selection-task.shop",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                setTodos([...todos, response.data]);
                return response;
              })
              .catch((error) => console.error(error));
            if (addTodoRef.current) {
              addTodoRef.current.value = "";
            }
          }}
        >
          추가
        </button>
      </div>
      <ul>
        {todos.map((item: todo) => (
          <li key={item.id}>
            <label>
              {item.isCompleted ? (
                <input
                  type="checkbox"
                  defaultChecked
                  onClick={() => {
                    axios
                      .put(
                        `/todos/${item.id}`,
                        { todo: item.todo, isCompleted: !item.isCompleted },
                        {
                          baseURL: "https://pre-onboarding-selection-task.shop",
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "jwt"
                            )}`,
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((response) => {
                        return response;
                      })
                      .catch((error) => console.error(error));
                  }}
                />
              ) : (
                <input
                  type="checkbox"
                  onClick={() => {
                    axios
                      .put(
                        `/todos/${item.id}`,
                        { todo: item.todo, isCompleted: !item.isCompleted },
                        {
                          baseURL: "https://pre-onboarding-selection-task.shop",
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "jwt"
                            )}`,
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((response) => {
                        return response;
                      })
                      .catch((error) => console.error(error));
                  }}
                />
              )}
              {item === updateTarget ? (
                <input
                  type="text"
                  data-testid="modify-input"
                  defaultValue={item.todo}
                  onChange={(event) => {
                    setUpdateStr(event.target.value);
                  }}
                />
              ) : (
                <span>{item.todo}</span>
              )}
            </label>
            {item === updateTarget ? (
              <div>
                <button
                  data-testid="submit-button"
                  onClick={() => {
                    const todoIdx = todos.indexOf(item);
                    const todoArr = todos;
                    todoArr.splice(todoIdx, 1, {
                      id: item.id,
                      isCompleted: item.isCompleted,
                      todo: updateStr,
                      userId: item.userId,
                    });
                    setTodos(todoArr);
                    axios
                      .put(
                        `/todos/${item.id}`,
                        { todo: updateStr, isCompleted: item.isCompleted },
                        {
                          baseURL: "https://pre-onboarding-selection-task.shop",
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "jwt"
                            )}`,
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((response) => {
                        return response;
                      })
                      .catch((error) => console.error(error));
                    setUpdateTarget({
                      id: 0,
                      isCompleted: false,
                      todo: "",
                      userId: 0,
                    });
                  }}
                >
                  제출
                </button>
                <button
                  data-testid="cancel-button"
                  onClick={() => {
                    setUpdateTarget({
                      id: 0,
                      isCompleted: false,
                      todo: "",
                      userId: 0,
                    });
                  }}
                >
                  취소
                </button>
              </div>
            ) : (
              <div>
                <button
                  data-testid="modify-button"
                  onClick={() => {
                    setUpdateTarget(item as todo);
                    setUpdateStr(item.todo);
                  }}
                >
                  수정
                </button>
                <button
                  data-testid="delete-button"
                  onClick={() => {
                    setTodos(todos.filter((todo) => todo !== item));
                    axios
                      .delete(`/todos/${item.id}`, {
                        baseURL: "https://pre-onboarding-selection-task.shop",
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "jwt"
                          )}`,
                        },
                      })
                      .then((response) => {
                        return response;
                      })
                      .catch((error) => console.error(error));
                  }}
                >
                  삭제
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
