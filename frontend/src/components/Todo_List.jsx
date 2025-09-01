import TodoItem from "./Todo_Item";

export default function TodoList({ todos, onUpdate, onDelete, showToast }) {
  return (
    <div className="flex flex-col gap-3 mt-5">
      {todos.length === 0 ? (
        <p className="text-center text-gray-600">No todos yet. Add one!</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
            showToast={showToast}
          />
        ))
      )}
    </div>
  );
}