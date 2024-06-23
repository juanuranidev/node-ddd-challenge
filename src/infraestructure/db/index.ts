import mongoose from "mongoose";
import ENVS from "../../config/envs/envs";

export const db = async () => {
  try {
    await mongoose.connect(ENVS.MONGO_URL);
    console.log("CONECTED TO MONGO");
  } catch (error) {
    console.log("ERROR IN MONGODB CONECTION:", error);
  }
};
