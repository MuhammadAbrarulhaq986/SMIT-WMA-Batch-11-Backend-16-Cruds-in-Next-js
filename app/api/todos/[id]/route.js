
import todosModel from "@/app/models/todos.model.js";
import { connectToDatabase } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

//* GET SINGLE TODO BY ID
export const GET = async (request, { params }) => {
    const { id } = await params;
    try {
        await connectToDatabase();
        const todo = await todosModel.findById(id);

        if (!todo) {
            return NextResponse.json({ message: "Todo Not Found" }, { status: 404 })
        }
        return NextResponse.json({ todo }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to Fetch Todo", error: error.message },
            { status: 500 }
        );
    }
};

//* UPDATE A TODO BY ID
export const PUT = async (request, { params }) => {
    const { id } = await params;
    try {
        await connectToDatabase();

        const body = await request.json();
        const updatedTodo = await todosModel.findByIdAndUpdate(
            id,
            {
                ...body,
            },
            { new: true }
        );
        if (!updatedTodo) {
            return NextResponse.json({ message: "Todo Not Found" }, { status: 404 })
        }

        return NextResponse.json(
            { message: "Todo Updated Successfully", todo: updatedTodo },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Faild to update todo", error: error.message },
            { status: 500 }
        );
    }
};

//* DELETE TODO BY ID
export default DELETE = async (request, { params }) => {
    const { id } = await params;
    try {
        await connectToDatabase();
        const deletedTodo = await todosModel.findByIdAndDelete(id);
        if (!deletedTodo) {
            return NextResponse.json({ message: "Todo Not Found" }, { status: 404 })
        }
        return NextResponse.json(
            { message: "Todo Deleted Successfully", todo: deletedTodo },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Faild to Delete Todo", error: error.message },
            { status: 500 }
        );
    }
}