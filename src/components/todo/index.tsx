import styles from "./todo.module.css";
import dots from "../../assets/dots.svg";
import { FormEvent, useState } from "react";

import type { TodoType } from "../../App";

type TodoProps = {
  todo: TodoType;
  updateTodo: (id: string, todo: TodoType) => void;
  deleteTodo: (id: string) => void;
};

function Todo({ todo, updateTodo, deleteTodo }: TodoProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  const editTitleHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTodo(todo.id, { ...todo, title });
    setTitle("");
    setIsEdit(false);
    setShowEdit(false);
  };

  const updateCompletedHandler = () => {
    setIsCompleted(!isCompleted);
    updateTodo(todo.id, { ...todo, completed: !isCompleted });
  };

  return (
    <div style={{ marginBlock: "1rem" }}>
      {isEdit ? (
        <div style={{ position: "relative", zIndex: 0 }}>
          <form onSubmit={editTitleHandler}>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={title}
              className={styles.input_text}
              type="text"
            />
            <input type="submit" className={styles.save_btn} value="Save" />
          </form>
        </div>
      ) : (
        <div className={styles.task_container}>
          <label>
            <input
              checked={isCompleted}
              onChange={updateCompletedHandler}
              className={styles.check}
              type="checkbox"
            />
            <span
              style={{
                textDecoration: isCompleted ? "line-through" : "none",
                color: isCompleted ? "#A9A9A9" : "black",
              }}
              className={styles.task_name}
            >
              {todo.title}
            </span>
          </label>
          <div className={styles.dots_container}>
            <img
              className={styles.dots}
              src={dots}
              alt="dots"
              onClick={() => setShowEdit(!showEdit)}
            />
            <div
              style={{ display: showEdit ? "block" : "none" }}
              className={styles.dots_popup}
            >
              <p onClick={() => setIsEdit(true)}>Edit</p>
              <p onClick={() => deleteTodo(todo.id)}>Delete</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Todo;
