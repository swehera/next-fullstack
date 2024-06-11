"use client";

import { setUsers } from "@/app/redux/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

const Update = ({ id }) => {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch user data when the component mounts
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        next: {
          revalidate: 60 * 60 * 24,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    };

    const fetchUserData = async () => {
      try {
        const data = await getData();
        setName(data.singleData.name);
        setRoll(data.singleData.roll);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  // Handle form submission to update user data
  const updateHandleUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, roll }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      toast.success("Updated successfully");
      router.push("/"); // Redirect to home page after update
    } catch (error) {
      toast.error("Failed to update user");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <p className="text-2xl font-semibold text-blue-500 text-center my-4">
        Update user
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
              onClick={updateHandleUser}
              className="px-3 py-1 bg-blue-500 text-white rounded-md"
            >
              Update now
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

export default Update;
