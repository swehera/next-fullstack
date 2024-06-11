import { connectDb } from "@/db/db";
import { User } from "@/model/userModel";
import { NextResponse } from "next/server";

async function handlerConnectDb() {
  try {
    await connectDb();
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { message: "Database connection error" },
      { status: 500 }
    );
  }
}

export const DELETE = async (request, { params }) => {
  const dbConnectionResponse = await handlerConnectDb();
  if (dbConnectionResponse) return dbConnectionResponse;

  try {
    const { id } = params;
    console.log("Deleting user with ID:", id);
    const deletedData = await User.findByIdAndDelete(id);
    if (!deletedData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Deleted successfully", deletedData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Error deleting user", error: error.message },
      { status: 500 }
    );
  }
};

export const PUT = async (request, { params }) => {
  const dbConnectionResponse = await handlerConnectDb();
  if (dbConnectionResponse) return dbConnectionResponse;

  try {
    const { id } = params;
    const body = await request.json(); // Parse the request body
    const updateData = await User.findByIdAndUpdate(id, body, { new: true }); // Pass the update data

    if (!updateData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Updated successfully", updateData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating user", error: error.message },
      { status: 500 }
    );
  }
};

//get single data
export const GET = async (request, { params }) => {
  const dbConnectionResponse = await handlerConnectDb();
  if (dbConnectionResponse) return dbConnectionResponse;

  try {
    const { id } = params;
    const singleData = await User.findById(id);
    if (!singleData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "single data", singleData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error single user:", error);
    return NextResponse.json(
      { message: "Error updating user", error: error.message },
      { status: 500 }
    );
  }
};
