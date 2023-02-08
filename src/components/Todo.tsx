import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Section } from "../style/publicStyle";
import styled from "styled-components";

const TextBar = styled.input`
  width: 24rem;
  height: 2rem;
`;

const TextBarBtn = styled.button`
  width: 4rem;
  height: 2.4rem;
`;

const List = styled.ul`
  width: 26rem;
  height: auto;
`;

const Item = styled.li`
  position: relative;
  padding: 6px;
`;

const BtnDiv = styled.div`
  display: inline-box;
  position: absolute;
  right: 6px;
`;

interface todo {
  id: number;
  isCompleted: boolean;
  todo: string;
  userId: number;
}

export const Todo = () => {
  const navigate = useNavigate();
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
    if (!localStorage.getItem("jwt") || localStorage.getItem("jwt") === "") {
      navigate("/signin");
    }
    axios
      .get("/todos", {
        baseURL: "https://pre-onboarding-selection-task.shop",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.error(error));
  }, [navigate]);
  return (
    <Section>
      <h1>TodoList</h1>
      <div>
        <TextBar
          type="text"
          data-testid="new-todo-input"
          required
          ref={addTodoRef}
          onChange={(event) => setNewTodo(event.target.value)}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
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
            }
          }}
        />
        <TextBarBtn
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
        </TextBarBtn>
      </div>
      <List>
        {todos.map((item: todo) => (
          <Item key={item.id}>
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
              <BtnDiv>
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
              </BtnDiv>
            ) : (
              <BtnDiv>
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
              </BtnDiv>
            )}
          </Item>
        ))}
      </List>
    </Section>
  );
};
