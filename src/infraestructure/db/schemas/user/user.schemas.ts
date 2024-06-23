import { Schema, model, Document } from "mongoose";

interface UserInterface extends Document {
  username: string;
  password: string;
}

const UserSchema = new Schema<UserInterface>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<UserInterface>("User", UserSchema);
