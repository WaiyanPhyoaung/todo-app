import { useState, useEffect } from "react";
import { TodoType } from "../App";

export const URL = "http://localhost:3001";

const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  // Function to fetch todos
  const fetchTodos = () => {
    fetch(`${URL}/todos`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = (title: string) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: "", title, completed: false },
    ]);
    fetch(`${URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed: false }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTodos();
      })
      .catch((error) => console.error("Error:", error));
  };

  // Function to update todo
  const updateTodo = (id: string, todo: TodoType) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
    const existingTodo = todos.find((todo) => todo.id === id);
    if (!existingTodo) {
      console.error("Todo not found");
      return;
    }

    const updatedTodo = { ...existingTodo, ...todo };

    fetch(`${URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTodos();
      })
      .catch(() => fetchTodos());
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => fetchTodos())
      .catch(() => fetchTodos());
  };
  return { todos, addTodo, updateTodo, deleteTodo };
};
export default useTodos;
