import {create} from "zustand";
import { devtools, persist } from "zustand/middleware";

const todoStore = (set) => ({
  todos: [],
  addTodo: (todo) => {
    const newTodo = { ...todo, completed: false };
    set((state) => ({
      todos: [newTodo, ...state.todos],
    }));
  },
  removeTodo: (todoId) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId)
    }));
  },
  toggleCompleted: (todoId)=>{
    set((state)=>({
      todos:state.todos.map((todo)=>
      todo.id === todoId ? {...todo,completed:!todo.completed} : todo 
      ),
    }))
  },
});

const useTodoStore = create(
  devtools(
    persist(todoStore, {
      name: "todos",
    })
  )
);

export default useTodoStore;



