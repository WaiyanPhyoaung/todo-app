import Select from "./components/select";
import Todo from "./components/todo";
import styles from "./app.module.css";
import { FormEvent, useCallback, useEffect } from "react";
import { useTodoContext } from "./context/TodoContext";
import useCompletionStats from "./hooks/useCompletionStats";
import ProgressCard from "./components/progressCard";

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

  const [completionRate, completedCount] = useCompletionStats(
    todoLists,
    currentFilter,
    fetchTodos
  );

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

  return (
    <main className={styles.container}>
      <ProgressCard
        completedCount={completedCount}
        completionRate={completionRate}
      />
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
