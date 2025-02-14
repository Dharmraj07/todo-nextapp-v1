// Import required modules
import connectToDB from "@/database";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

// GET route to fetch completed Todos
export async function GET() {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all Todos where the `completed` field is true
    const completedTodos = await Todo.find({ completed: true });

    // Return the completed Todos as JSON
    return NextResponse.json(
      {
        success: true,
        data: completedTodos || [], // Ensure an empty array is returned if no completed Todos exist
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching completed Todos:", error);

    // Return a generic error response
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again later",
      },
      { status: 500 }
    );
  }
}