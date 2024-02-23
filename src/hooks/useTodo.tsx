import { useState, useEffect, useCallback } from "react";
import { TodoType } from "../App";

export const URL = "http://localhost:3001/todos";

export enum FilterOptions {
  all = "all",
  done = "done",
  undone = "undone",
}

export const useTodo = () => {
  const [todoLists, setTodos] = useState<TodoType[]>([]);
  const [currentFilter, setCurrentFilter] = useState(FilterOptions.all);

  const fetchTodos = useCallback(async () => {
    // Construct the URL based on the filter
    let url = URL;
    if (currentFilter === FilterOptions.done) {
      url += "?completed=true";
    } else if (currentFilter === FilterOptions.undone) {
      url += "?completed=false";
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      alert("Try again, Error fetching todo lists");
    }
  }, [currentFilter]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(
    async (title: string) => {
      const newTodo = {
        id: "",
        title,
        completed: currentFilter === FilterOptions.done ? true : false,
      };
      // Optimistically add the new todo to the state
      setTodos((currentTodos) => [...currentTodos, newTodo]);

      try {
        await fetch(`${URL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTodo),
        });
        // Fetch todos again to ensure sync with server state
        fetchTodos();
      } catch (error) {
        // Revert to previous state if the request fails
        fetchTodos();
      }
    },
    [currentFilter, fetchTodos]
  );

  const updateTodo = useCallback(
    async (id: string, updates: Partial<TodoType>) => {
      // Optimistically update the todo in the state
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updates } : todo
        )
      );

      try {
        await fetch(`${URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        // Fetch todos again
        fetchTodos();
      } catch (error) {
        // Revert to previous state if the request fails
        fetchTodos();
      }
    },
    [fetchTodos]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      // Optimistically remove the todo from the state
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));

      try {
        await fetch(`${URL}/${id}`, { method: "DELETE" });
        fetchTodos();
      } catch (error) {
        // Revert to previous state if the request fails
        fetchTodos();
      }
    },
    [fetchTodos]
  );

  return {
    todoLists,
    fetchTodos,
    currentFilter,
    setCurrentFilter,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};
