import todosModel from "@/app/models/todos.model.js"; // Importing the Todos model
import { connectToDatabase } from "@/utils/dbConnect"; // Utility function to connect to the database
import { NextResponse } from "next/server"; // Helper for creating Next.js API responses


// * CREATE A NEW TODO
export async function POST(request) {
    try {
        const body = await request.json(); // Parse the JSON body of the request
        await connectToDatabase(); // Establish database connection

        // Validate the request body
        if (!body.title)
            return NextResponse.json(
                { message: "Invalid todo title" },
                { status: 400 } // Return 400 for bad request
            );

        // Create a new todo in the database
        const newTodo = await todosModel.create({
            title: body.title,
        });

        // Return a success response with the newly created todo
        return NextResponse.json(
            { message: "New todo added", todo: newTodo },
            { status: 201 }
        );
    } catch (error) {
        // Return an error response
        return NextResponse.json(
            { message: "Failed to create todo", error: error.message },
            { status: 500 }
        );
    }
}

// * GET ALL TODOS
export async function GET() {
    try {
        await connectToDatabase(); // Establish database connection

        // Fetch all todos from the database
        const todos = await todosModel.find({});
        return NextResponse.json({ todos }, { status: 200 }); // Return todos with a 200 status
    } catch (error) {
        // Return an error response
        return NextResponse.json(
            { message: "Failed to fetch todos", error: error.message },
            { status: 500 }
        );
    }
}

// * DELETE ALL TODOS
export async function DELETE() {
    try {
        await connectToDatabase(); // Establish database connection

        // Delete all todos from the database
        const result = await todosModel.deleteMany({});
        return NextResponse.json(
            {
                message: "All todos deleted successfully",
                deletedCount: result.deletedCount, // Return the count of deleted documents
            },
            { status: 200 }
        );
    } catch (error) {
        // Return an error response
        return NextResponse.json(
            { message: "Failed to delete todos", error: error.message },
            { status: 500 }
        );
    }
}
