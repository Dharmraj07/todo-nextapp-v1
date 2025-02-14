"use client";
import { Fragment, useState } from "react";

function AddNewTodo({
  openTodoDialog,
  setOpenTodoDialog,
  loading,
  setTodoFormData,
  todoFormData,
  handleSaveTodoData,
  currentEditedTodoID,
  setCurrentEditedTodoID,
}) {
  return (
    <Fragment>
      {/* Button to Open the Dialog */}
      <div>
        <button
          onClick={() => setOpenTodoDialog(true)}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Add New Todo
        </button>
      </div>

      {/* Dialog for Adding or Editing Todo */}
      {openTodoDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {currentEditedTodoID ? "Edit Todo" : "Add New Todo"}
              </h2>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Title Field */}
              <div className="flex gap-4">
                <label htmlFor="title" className="w-1/4 text-right text-gray-700 font-medium">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter todo title"
                  value={todoFormData.title}
                  onChange={(event) =>
                    setTodoFormData({
                      ...todoFormData,
                      title: event.target.value,
                    })
                  }
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Description Field */}
              <div className="flex gap-4">
                <label htmlFor="description" className="w-1/4 text-right text-gray-700 font-medium">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter todo description"
                  value={todoFormData.description}
                  onChange={(event) =>
                    setTodoFormData({
                      ...todoFormData,
                      description: event.target.value,
                    })
                  }
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Due Date Field */}
              <div className="flex gap-4">
                <label htmlFor="dueDate" className="w-1/4 text-right text-gray-700 font-medium">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  name="dueDate"
                  id="dueDate"
                  value={todoFormData.dueDate}
                  onChange={(event) =>
                    setTodoFormData({
                      ...todoFormData,
                      dueDate: event.target.value,
                    })
                  }
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Priority Field */}
              <div className="flex gap-4">
                <label htmlFor="priority" className="w-1/4 text-right text-gray-700 font-medium">
                  Priority
                </label>
                <select
                  name="priority"
                  id="priority"
                  value={todoFormData.priority}
                  onChange={(event) =>
                    setTodoFormData({
                      ...todoFormData,
                      priority: event.target.value,
                    })
                  }
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Completed Checkbox */}
              <div className="flex gap-4">
                <label htmlFor="completed" className="w-1/4 text-right text-gray-700 font-medium">
                  Completed
                </label>
                <input
                  type="checkbox"
                  name="completed"
                  id="completed"
                  checked={todoFormData.completed}
                  onChange={(event) =>
                    setTodoFormData({
                      ...todoFormData,
                      completed: event.target.checked,
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>

            {/* Footer with Save Button */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setOpenTodoDialog(false);
                  setTodoFormData({
                    title: "",
                    description: "",
                    dueDate: "",
                    priority: "medium",
                    completed: false,
                  });
                  setCurrentEditedTodoID(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTodoData}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default AddNewTodo;