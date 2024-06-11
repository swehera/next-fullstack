"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../app/redux/userSlice"; // Adjust the path to your userSlice
import { useRouter } from "next/navigation";
import Link from "next/link";

const AddUser = () => {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const addHandleUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/api/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, roll }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const newUser = await response.json();
      console.log("User added:", newUser);
      dispatch(addUser(newUser));
      toast.success("User added successfully");
      router.push("/"); // Use router.push instead of router("/")
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user");
    }
  };

  return (
    <div>
      <p className="text-2xl font-semibold text-blue-500 text-center my-4">
        Add new user
      </p>
      <div className="flex items-center justify-center">
        <div className="w-[70%] flex flex-col gap-y-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="outline-none w-full px-3 py-1 border border-gray-400 rounded-md"
          />
          <input
            type="number"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            placeholder="Enter roll"
            className="outline-none w-full px-3 py-1 border border-gray-400 rounded-md"
          />
          <div className="flex flex-col items-center justify-center gap-y-3 my-2">
            <button
              onClick={addHandleUser}
              className="px-3 py-1 bg-blue-500 text-white rounded-md"
            >
              Add new
            </button>
            <Link
              href={"/"}
              className="px-3 py-1 bg-gray-900 text-white rounded-md"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddUser;
