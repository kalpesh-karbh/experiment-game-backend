import mongoose from "mongoose";
import config from "./config";
import { insertDefaultArmyData } from "../models/Army.model";

export const connectDB = async () => {
  console.log("Attempting DB connection");
  try {
    const conn = await mongoose.connect(config.mongoose.url!);
    mongoose.connection.once("open", async () => {
      try {
        await insertDefaultArmyData();
      } catch (error) {
        console.error("Error inserting default data:", error);
      }
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Db connection error", error);
  }
};
