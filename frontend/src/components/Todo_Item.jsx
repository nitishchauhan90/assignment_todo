import api from "../api/axios";

export default function TodoItem({ todo, onUpdate, onDelete, showToast }) {
  if (!todo) return null;

  const toggleCompleted = async () => {
    try {
      const res = await api.put(`/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      onUpdate(res.data);
      showToast(todo.completed ? "Marked as undone!" : "Todo completed!");
    } catch (err) {
      showToast("Error updating todo!");
      console.error("Error updating todo:", err.message);
    }
  };

  const deleteTodo = async () => {
    try {
      await api.delete(`/todos/${todo._id}`);
      onDelete(todo._id);
      showToast("Todo deleted!");
    } catch (err) {
      showToast("Error deleting todo!");
      console.error("Error deleting todo:", err.message);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
      <div>
        <h3
          className={`font-semibold ${
            todo?.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo?.title || "Untitled"}
        </h3>
        <p className="text-sm text-gray-600">
          {todo?.description || "No description"}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleCompleted}
          className={`px-3 py-1 rounded-md text-white ${
            todo?.completed ? "bg-yellow-500" : "bg-green-500"
          }`}
        >
          {todo?.completed ? "Undo" : "Done"}
        </button>

        <button
          onClick={deleteTodo}
          className="px-3 py-1 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}