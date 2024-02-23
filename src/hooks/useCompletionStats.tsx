import { useState, useEffect, useCallback } from "react";
import { TodoType } from "../App";

function useCompletionStats(
  todoLists: TodoType[],
  currentFilter: string,
  fetchTodos: (filter: string) => void
): [number, number] {
  const [completionRate, setCompletionRate] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);

  useEffect(() => {
    fetchTodos(currentFilter);
  }, [currentFilter, fetchTodos]);

  const debouncedUpdate = useCallback(() => {
    const totalCount = todoLists.length;
    const newCompletedCount =
      Array.isArray(todoLists) &&
      todoLists.filter((todo) => todo.completed).length;
    const newCompletionRate =
      totalCount === 0 ? 0 : (+newCompletedCount / totalCount) * 100;
    setCompletedCount(+newCompletedCount);
    setCompletionRate(newCompletionRate);
  }, [todoLists]);

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedUpdate();
    }, 300); // Adjust delay time as needed (e.g., 300ms)

    return () => clearTimeout(timer); // Clear the timeout when the component unmounts or rerenders
  }, [debouncedUpdate]);

  return [completionRate, completedCount];
}

export default useCompletionStats;
