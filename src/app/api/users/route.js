import { connectDb } from "@/db/db";
import { User } from "@/model/userModel";
import { NextResponse } from "next/server";

// Connection should be inside the handler to ensure it's connected each time
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

export const GET = async (request) => {
  await handlerConnectDb();

  const userData = await User.find();

  return NextResponse.json(userData, {
    status: 201,
  });
};

export const POST = async (request) => {
  await handlerConnectDb();

  try {
    const { name, roll } = await request.json(); // Use .json() to parse the request body

    const userData = await User.create({
      name: name,
      roll: roll,
    });

    return NextResponse.json(userData, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  }
};
