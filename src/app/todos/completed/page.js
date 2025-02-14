import TodoOverview from "@/components/todo-overview";

// Fetch the list of todos from the API
async function fetchListOfTodos() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/completed-todos", {
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
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Completed Todos</h1>
      </header>
      <TodoOverview todoList={todoList} />
    </>
  ); // Pass the todo list to the TodoOverview component
}

export default Todos;
