// Import required modules
import connectToDB from "@/database";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

// DELETE route to remove a Todo by ID
export async function DELETE(req) {
  try {
    // Connect to the database
    await connectToDB();

    // Extract the Todo ID from the query parameters
    const { searchParams } = new URL(req.url);
    const todoID = searchParams.get("id");
    console.log(todoID);

    // Check if the Todo ID is provided
    if (!todoID) {
      return NextResponse.json(
        {
          success: false,
          message: "Todo ID is required",
        },
        { status: 400 } // Bad Request status code
      );
    }

    // Delete the Todo by ID
    const deletedTodo = await Todo.findByIdAndDelete(todoID);

    // Check if the Todo was successfully deleted
    if (deletedTodo) {
      return NextResponse.json(
        {
          success: true,
          message: "Todo deleted successfully",
        },
        { status: 200 } // OK status code
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "No Todo found with the provided ID",
        },
        { status: 404 } // Not Found status code
      );
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error deleting Todo:", error);

    // Return a generic error response
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again",
      },
      { status: 500 } // Internal Server Error status code
    );
  }
}