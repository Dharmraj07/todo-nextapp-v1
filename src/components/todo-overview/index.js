"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddNewTodo from "../add-new-todo";

// Initial state for Todo form data
const initialTodoFormData = {
  title: "",
  description: "",
  dueDate: "",
  priority: "medium",
  completed: false,
};

function TodoOverview({ todoList }) {
  const [openTodoDialog, setOpenTodoDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todoFormData, setTodoFormData] = useState(initialTodoFormData);
  const [currentEditedTodoID, setCurrentEditedTodoID] = useState(null);
  const router = useRouter();

  // Refresh the page when the component mounts
  useEffect(() => {
    router.refresh();
  }, []);

  // Function to handle saving or updating a Todo
  async function handleSaveTodoData() {
    try {
      setLoading(true);

      // Determine whether to add or update a Todo
      const apiResponse =
        currentEditedTodoID !== null
          ? await fetch(`/api/update-todo?id=${currentEditedTodoID}`, {
              method: "PUT",
              body: JSON.stringify(todoFormData),
            })
          : await fetch("/api/add-todo", {
              method: "POST",
              body: JSON.stringify(todoFormData),
            });

      const result = await apiResponse.json();

      if (result?.success) {
        setTodoFormData(initialTodoFormData); // Reset form data
        setOpenTodoDialog(false); // Close the dialog
        setLoading(false); // Stop loading
        setCurrentEditedTodoID(null); // Reset edited ID
        router.refresh(); // Refresh the page
      }

      console.log(result);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setTodoFormData(initialTodoFormData);
    }
  }

  // Function to handle deleting a Todo by ID
  async function handleDeleteTodoByID(getCurrentID) {
    try {
      const apiResponse = await fetch(`/api/delete-todo?id=${getCurrentID}`, {
        method: "DELETE",
      });

      const result = await apiResponse.json();

      if (result?.success) {
        router.refresh(); // Refresh the page after deletion
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Function to handle editing a Todo
  function handleEdit(getCurrentTodo) {
    setCurrentEditedTodoID(getCurrentTodo?._id); // Set the ID of the Todo being edited
    setTodoFormData({
      title: getCurrentTodo?.title,
      description: getCurrentTodo?.description,
      dueDate: getCurrentTodo?.dueDate
        ? formatDateForClient(new Date(getCurrentTodo.dueDate))
        : "",
      priority: getCurrentTodo?.priority,
      completed: getCurrentTodo?.completed,
    });
    setOpenTodoDialog(true); // Open the dialog for editing
  }

  // Helper function to format date consistently
  function formatDateForClient(date) {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`; // MM/DD/YYYY format
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
        <button
          onClick={() => setOpenTodoDialog(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add New Todo
        </button>
      </header>

      {/* Add New Todo Dialog */}
      <AddNewTodo
        openTodoDialog={openTodoDialog}
        setOpenTodoDialog={setOpenTodoDialog}
        loading={loading}
        setLoading={setLoading}
        todoFormData={todoFormData}
        setTodoFormData={setTodoFormData}
        handleSaveTodoData={handleSaveTodoData}
        currentEditedTodoID={currentEditedTodoID}
        setCurrentEditedTodoID={setCurrentEditedTodoID}
      />

      {/* Todo List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {todoList && todoList.length > 0 ? (
          todoList.map((todoItem) => (
            <div
              key={todoItem._id}
              className="bg-white rounded-lg shadow-sm p-6 space-y-4 hover:shadow-lg transition duration-300"
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 truncate">
                {todoItem?.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2">
                {todoItem?.description || "No description"}
              </p>

              {/* Due Date */}
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {todoItem?.dueDate
                  ? formatDateForClient(new Date(todoItem.dueDate))
                  : "No due date"}
              </p>

              {/* Priority */}
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    todoItem?.priority === "high"
                      ? "bg-red-500"
                      : todoItem?.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                ></span>
                {todoItem?.priority.charAt(0).toUpperCase() +
                  todoItem.priority.slice(1)}{" "}
                Priority
              </p>

              {/* Completed Status */}
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${
                    todoItem?.completed ? "text-green-500" : "text-gray-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {todoItem?.completed ? "Completed" : "Not Completed"}
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleEdit(todoItem)}
                  className="text-blue-600 hover:text-blue-700 font-medium transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodoByID(todoItem._id)}
                  className="text-red-600 hover:text-red-700 font-medium transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-2xl font-semibold text-gray-600">
              No todos found! Please add one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoOverview;