import Select from "./components/select";
import Todo from "./components/todo";
import styles from "./app.module.css";
import { FormEvent, useMemo } from "react";
import useTodos from "./hooks/useTodos";

export type TodoType = {
  id: string;
  title: string;
  completed: boolean;
};

function App() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  console.log(todos);
  const addTodoHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.elements[0] as HTMLInputElement;
    console.log(input.value);
    addTodo(input.value);
    input.value = "";
  };
  const totalCount = todos.length;
  const completedCount = useMemo(
    () => Array.isArray(todos) && todos.filter((todo) => todo.completed).length,
    [todos]
  );
  const completionRate = (+completedCount / totalCount) * 100;

  return (
    <main className={styles.container}>
      <section className={styles.progress_container}>
        <h1 className={styles.progress_heading}>Progress</h1>
        <div className={styles.progress_line}>
          <div
            className={styles.progress_bar}
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <p className={styles.completed_text}>{completedCount} completed</p>
      </section>
      <section className={styles.list_container}>
        <div className={styles.list_heading}>
          <h2 className={styles.tasks_text}>Tasks</h2>
          <Select />
        </div>

        <div className={styles.lists}>
          {Array.isArray(todos) && todos.length > 1
            ? todos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  updateTodo={updateTodo}
                  deleteTodo={deleteTodo}
                />
              ))
            : null}
          <form onSubmit={addTodoHandler}>
            <input
              autoFocus
              className={styles.input_text}
              type="text"
              placeholder="Add your todo..."
            />
          </form>
        </div>
      </section>
    </main>
  );
}

export default App;
