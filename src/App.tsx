import Select from "./components/select";
import Todo from "./components/todo";
import styles from "./app.module.css";
import { FormEvent, useCallback, useEffect, useMemo } from "react";
import { useTodoContext } from "./context/TodoContext";

export type TodoType = {
  id: string;
  title: string;
  completed: boolean;
};

function App() {
  const {
    todoLists,
    currentFilter,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  } = useTodoContext();

  useEffect(() => {
    fetchTodos(currentFilter);
  }, [currentFilter, fetchTodos]);

  const addTodoHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const input = event.currentTarget.elements[0] as HTMLInputElement;
      addTodo(input.value);
      input.value = "";
    },
    [addTodo]
  );

  const totalCount = todoLists.length;
  const completedCount = useMemo(
    () =>
      Array.isArray(todoLists) &&
      todoLists.filter((todo) => todo.completed).length,
    [todoLists]
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
          {Array.isArray(todoLists) && todoLists.length > 0
            ? todoLists.map((todo) => (
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
