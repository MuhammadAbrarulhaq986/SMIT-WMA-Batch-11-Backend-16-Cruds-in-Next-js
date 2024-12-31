import { NextResponse } from "next/server";

//* Simulating a database (replace with actual DB logic)
let todos = [
    { id: "1", title: "Learn Next.js", completed: false },
    { id: "2", title: "Build a Next.js app", completed: false },
];

//* GET: Fetch a specific todo by id
export async function GET(request, { params }) {
    const { id } = params; //* Extracting the id from params

    const todo = todos.find((t) => t.id === id); //* Find todo by id
    if (!todo) {
        return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Fetched todo successfully", todo }, { status: 200 });
}

//* DELETE: Remove a specific todo by id
export async function DELETE(request, { params }) {
    const { id } = params; //* Extracting the id from params

    const todoIndex = todos.findIndex((t) => t.id === id); //* Find index of the todo
    if (todoIndex === -1) {
        return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    todos.splice(todoIndex, 1); //* Remove the todo from the array
    return NextResponse.json(
        { message: "Todo deleted successfully", todos }, //* Return the updated todos
        { status: 200 }
    );
}
