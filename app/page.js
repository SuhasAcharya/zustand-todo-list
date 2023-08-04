"use client";
import { useState } from "react";
import useTodoStore from "./store";

export default function Home() {
  const {addTodo,removeTodo,todos,toggleCompleted} = useTodoStore((state) => ({
    addTodo:state.addTodo,
    removeTodo:state.removeTodo,
    todos:state.todos,
    toggleCompleted:state.toggleCompleted
  }));

  const [todo, setTodo] = useState("");

  console.log("todos", todos);
  console.log({todo});

  const handleSubmit = () => {

    if(todo.length===0){
      alert('Todos cant be empty');
    }else{
      const id = Math.ceil(Math.random()*100000000000); 
    addTodo({
      id:id,
      name: todo,
    });
    setTodo('');
  }
  };

  return (
    <div className="flex flex-col gap-y-10 justify-center items-center h-[auto] mt-8 w-full">
      <input
        className="h-[50px] w-[60vh] border-[2px] border-gray-400 rounded-md p-4"
        placeholder="Enter Todo Here!"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      ></input>
      <button
        className="h-[50px] w-[20%] bg-red-500 rounded-md hover:bg-red-800"
        onClick={handleSubmit}
      >
        <span className="text-white font-semibold">Submit</span>
      </button>
      <div className="h-[auto] w-[35%] rounded-lg gap-y-2 border-[2px] border-gray-400 p-4">
      {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={ `h-[15px] w-[90%] rounded-sm my-3 ml-4 flex justify-between`}
              onClick={()=>toggleCompleted(todo.id)}
            >
              <span className={`text-black font-bold text-base ${todo.completed ? `line-through` : ``}`}

              >
                {todo.name}
              </span>
              <button onClick={() => removeTodo(todo.id)}>
                <span className="text-red-500">Delete</span>
              </button>
            </div>
          ))
        ) : (
          <div>No Todos added yet.</div>
        )}
      </div>
    </div>
  );
}
