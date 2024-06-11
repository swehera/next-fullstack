import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "work_manager",
    });
    console.log("db connected...");
    console.log(connection.host);
  } catch (error) {
    console.log({ error: error });
    console.log("failed to connect to database");
  }
};
