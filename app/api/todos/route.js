import { NextResponse } from "next/server";

//* Dummy data for demonstration
let todos = []; //* This simulates a database

//* GET: Fetch all todos
export async function GET() {
    return NextResponse.json(
        {
            message: "Fetched all todos successfully",
            todos, //* Return the current list of todos
        },
        { status: 200 }
    );
}

//* POST: Create a new todo
export async function POST(request) {
    try {
        const body = await request.json(); //* Parse the request body
        if (!body || !body.title) { //* Validate the request body
            return NextResponse.json(
                { message: "Invalid todo data. 'title' is required." },
                { status: 400 }
            );
        }

        const newTodo = { id: Date.now(), ...body }; //* Add a unique ID to each todo
        todos.push(newTodo); //* Add the new todo to the list
        return NextResponse.json(
            {
                message: "Todo added successfully",
                todos, //* Return the updated list of todos
            },
            { status: 201 } //* 201 status for resource creation
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to add todo", error: error.message },
            { status: 400 }
        );
    }
}

//* PUT: Update a specific todo by ID
export async function PUT(request) {
    try {
        const body = await request.json(); //* Parse the request body
        const { id, updatedTodo } = body; //* Extract ID and updated data

        //* Check if ID and updatedTodo are provided
        if (!id || !updatedTodo) {
            return NextResponse.json(
                { message: "Invalid data. 'id' and 'updatedTodo' are required." },
                { status: 400 }
            );
        }

        //* Find the todo by ID
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex === -1) {
            return NextResponse.json(
                { message: `Todo with ID ${id} not found.` },
                { status: 404 }
            );
        }

        todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo }; //* Update the todo
        return NextResponse.json(
            {
                message: "Todo updated successfully",
                todos, //* Return the updated list
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update todo", error: error.message },
            { status: 400 }
        );
    }
}

//* DELETE: Remove a specific todo by ID or all todos
export async function DELETE(request) {
    try {
        const body = await request.json();
        const { id } = body; //* Extract the ID from the request body

        if (id) {
            //* Find the todo by ID
            const todoIndex = todos.findIndex((todo) => todo.id === id);
            if (todoIndex === -1) {
                return NextResponse.json(
                    { message: `Todo with ID ${id} not found.` },
                    { status: 404 }
                );
            }

            //* Remove the todo
            todos.splice(todoIndex, 1);
            return NextResponse.json(
                {
                    message: `Todo with ID ${id} deleted successfully`,
                    todos, //* Return the updated list
                },
                { status: 200 }
            );
        }

        //* If no ID is provided, delete all todos
        todos = [];
        return NextResponse.json(
            {
                message: "All todos deleted successfully",
                todos, //* Return the cleared list (empty)
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to delete todos", error: error.message },
            { status: 400 }
        );
    }
}
