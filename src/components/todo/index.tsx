import styles from "./todo.module.css";
import dots from "../../assets/dots.svg";
import { FormEvent, useState } from "react";
import type { TodoType } from "../../App";
import useClickOutside from "../../hooks/useClickOutside";

type TodoProps = {
  todo: TodoType;
  updateTodo: (id: string, todo: TodoType) => void;
  deleteTodo: (id: string) => void;
};

function Todo({ todo, updateTodo, deleteTodo }: TodoProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);
  const { isOpen, setIsOpen, ref } = useClickOutside();

  const editTitleHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTodo(todo.id, { ...todo, title });
    setTitle("");
    setIsEdit(false);
    setIsOpen(false);
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
              defaultValue={todo.title}
              className={styles.input_text}
              type="text"
            />
            <input type="submit" className={styles.save_btn} value="Save" />
          </form>
        </div>
      ) : (
        <div className={styles.task_container}>
          <label className={styles.todo_label}>
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
          <div ref={ref} className={styles.dots_container}>
            <img
              className={styles.dots}
              src={dots}
              alt="dots"
              onClick={() => setIsOpen(!isOpen)}
            />
            <div
              style={{ display: isOpen ? "block" : "none" }}
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
