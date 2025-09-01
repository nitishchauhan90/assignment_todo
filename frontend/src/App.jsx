import { useEffect, useState } from "react";
import api from "./api/axios";
import TodoForm from "./components/Todo_Form";
import TodoList from "./components/Todo_List";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000); 
  };


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get("/todos");
        setTodos(res.data);
      } catch (err) {
        console.error("Error fetching todos:", err.message);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      const res = await api.post("/todos", newTodo);
      setTodos([...todos, res.data]);
      showToast("Todo added!");
    } catch (err) {
      showToast("Error adding todo!");
      console.error("Error adding todo:", err.message);
    }
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map((t) => (t._id === updatedTodo._id ? updatedTodo : t)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-10">
    <div className="relative max-w-lg w-full bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-black drop-shadow-md">
         Todo App 
      </h1>

    
      <TodoForm onAdd={addTodo} showToast={showToast} />


      {/* <div className="mt-4 overflow-y-auto max-h-96 ">
        <TodoList
          todos={todos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          showToast={showToast}
        />
      </div> */}
      <div
        className="mt-4 overflow-y-auto max-h-96 w-full"
        style={{ scrollbarGutter: "stable" }}
      >
        <TodoList
          todos={todos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          showToast={showToast}
        />
      </div>

    </div>
    {toast && (
      <div className="fixed top-5 right-5 z-50">
        <div className="bg-black text-white px-4 py-2 rounded-md shadow-md">
          {toast}
        </div>
      </div>
    )}
  </div>
  );
}

