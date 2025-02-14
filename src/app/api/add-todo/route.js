// Import required modules
import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Todo from "@/models/todo";
import Joi from "joi";

// Define validation schema for adding a new Todo
const addNewTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  completed: Joi.boolean().default(false),
  dueDate: Joi.date().iso().optional(),
  priority: Joi.string()
    .valid("low", "medium", "high")
    .default("medium"),
});

// POST route to add a new Todo
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body
    const todoData = await req.json();

    // Validate the request data against the schema
    const { error } = addNewTodoSchema.validate(todoData);
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.details[0].message,
        },
        { status: 400 }
      );
    }

    // Create a new Todo in the database
    const newlyCreatedTodo = await Todo.create(todoData);

    // Check if the creation was successful
    if (newlyCreatedTodo) {
      return NextResponse.json(
        {
          success: true,
          message: "Todo added successfully",
          data: newlyCreatedTodo,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong! Please try again.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating Todo:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again.",
      },
      { status: 500 }
    );
  }
}