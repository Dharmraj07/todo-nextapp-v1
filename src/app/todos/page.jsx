import TodoOverview from "@/components/todo-overview";
import Link from "next/link";

// Fetch the list of todos from the API
async function fetchListOfTodos() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-todos", {
      method: "GET",
      cache: "no-store", // Ensure fresh data on each request
    });
    console.log("Fetching todos...");
    const result = await apiResponse.json();
    return result?.data; // Return the todo data
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Failed to fetch todos");
  }
}

// Main component to display the list of todos
async function Todos() {
  console.log("Fetching todos...");

  const todoList = await fetchListOfTodos(); // Fetch the todos
  console.log(todoList, "todoList"); // Log the fetched data for debugging

  return (
    <>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        <Link href="todos/today">Today Todo</Link>
      </button>
      <TodoOverview todoList={todoList} />;
    </>
  ); // Pass the todo list to the TodoOverview component
}

export default Todos;
