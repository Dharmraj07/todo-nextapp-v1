// Import required modules
import connectToDB from "@/database";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

// GET route to fetch all Todos
export async function GET() {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all Todos from the database
    const todos = await Todo.find({});

    // Return the Todos as JSON
    return NextResponse.json(
      {
        success: true,
        data: todos || [], // Ensure an empty array is returned if no Todos exist
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Todos:", error);

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