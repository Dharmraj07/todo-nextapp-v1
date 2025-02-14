// Import required modules
import connectToDB from "@/database";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

// GET route to fetch today's Todos
export async function GET() {
  try {
    // Connect to the database
    await connectToDB();

    // Get the current date (start of the day and end of the day)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of the day (00:00:00)
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of the day (23:59:59)

    // Fetch all Todos with dueDate within the current day
    const todos = await Todo.find({
      dueDate: {
        $gte: startOfDay, // Greater than or equal to the start of the day
        $lte: endOfDay,   // Less than or equal to the end of the day
      },
    });

    // Return the Todos as JSON
    return NextResponse.json(
      {
        success: true,
        data: todos || [], // Ensure an empty array is returned if no Todos exist
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching today's Todos:", error);

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