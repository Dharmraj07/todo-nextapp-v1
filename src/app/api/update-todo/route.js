// Import required modules
import connectToDB from "@/database";
import Todo from "@/models/todo";
import Joi from "joi";
import { NextResponse } from "next/server";

// Define the validation schema for updating a Todo
const updateTodoSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().allow("").optional(),
  completed: Joi.boolean().optional(),
  dueDate: Joi.alternatives().try(Joi.date().iso(), Joi.string().isoDate()).optional(),
  priority: Joi.string().valid("low", "medium", "high").optional(),
});

// PUT route to update a Todo by ID
export async function PUT(req) {
  try {
    // Connect to the database
    await connectToDB();

    // Extract the Todo ID from the query parameters
    const { searchParams } = new URL(req.url);
    const todoID = searchParams.get("id");

    // Check if the Todo ID is provided
    if (!todoID) {
      return NextResponse.json(
        { success: false, message: "Todo ID is required" },
        { status: 400 }
      );
    }

    // Parse the request body
    const todoData = await req.json();

    // Ensure dueDate is in ISO format if provided
    if (todoData.dueDate) {
      todoData.dueDate = new Date(todoData.dueDate).toISOString();
    }

    // Validate the request body against the schema
    const { error } = updateTodoSchema.validate(todoData);
    if (error) {
      return NextResponse.json(
        { success: false, message: error.details[0].message },
        { status: 400 }
      );
    }

    // Remove undefined fields from the update object
    const updateFields = Object.keys(todoData).reduce((acc, key) => {
      if (todoData[key] !== undefined) {
        acc[key] = todoData[key];
      }
      return acc;
    }, {});

    // Check if there's anything to update
    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { success: false, message: "No fields provided for update" },
        { status: 400 }
      );
    }

    // Update the Todo by ID
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoID },
      { $set: updateFields },
      { new: true }
    );

    // Check if the Todo was successfully updated
    if (updatedTodo) {
      return NextResponse.json(
        { success: true, message: "Todo updated successfully", data: updatedTodo },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "No Todo found with the provided ID" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating Todo:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong! Please try again" },
      { status: 500 }
    );
  }
}
