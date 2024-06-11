"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, removeUser } from "../app/redux/userSlice"; // Adjust the path accordingly

const getData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/users`, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const Alldata = () => {
  const dispatch = useDispatch();
  const alldata = useSelector((state) => state.user.userInfo);

  const fetchData = useCallback(async () => {
    try {
      const data = await getData();
      dispatch(setUsers(data));
      console.log("Data fetched and saved to Redux store", data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log("This is all data from Redux store", alldata);

  const deleteProduct = async (id) => {
    console.log("Deleting product with id", id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/api/users/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      dispatch(removeUser(id));
    } else {
      console.error("Failed to delete the product");
    }

    return response;
  };

  return (
    <div className="my-5">
      <div className="flex items-center justify-center my-3">
        <Link
          href={"/add-users"}
          className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-md"
        >
          Add New
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <table className="w-[80%] whitespace-nowrap">
          <thead>
            <tr>
              <th className="p-[8px] text-left border border-gray-800">Name</th>
              <th className="p-[8px] text-left border border-gray-800">Roll</th>
              <th className="p-[8px] text-center border border-gray-800">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {alldata.map((item) => (
              <tr key={item?._id}>
                <td className="p-[8px] text-left border border-gray-800">
                  <p>{item?.name}</p>
                </td>
                <td className="p-[8px] text-left border border-gray-800">
                  <p>{item?.roll}</p>
                </td>
                <td className="p-[8px] text-center border border-gray-800">
                  <div className="flex items-center justify-center gap-x-2">
                    <Link
                      href={{
                        pathname: `/update/${item?._id}`,
                        query: {
                          _id: item?._id,
                        },
                      }}
                      className="bg-green-900 text-white text-sm font-semibold px-3 py-1 rounded-md"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="bg-red-900 text-white text-sm font-semibold px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alldata;
