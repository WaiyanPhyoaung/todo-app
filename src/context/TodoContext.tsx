import { createContext, useContext, ReactNode } from "react";
import { TodoType } from "../App";
import { FilterOptions, useTodo } from "../hooks/useTodo";

type TodoContextType = {
  todoLists: TodoType[];
  currentFilter: FilterOptions;
  setCurrentFilter: (arg: FilterOptions) => void;
  fetchTodos: (filter: string) => void;
  addTodo: (title: string) => void;
  updateTodo: (id: string, todo: Partial<TodoType>) => void;
  deleteTodo: (id: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodosContext must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const value = useTodo();
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
