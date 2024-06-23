import { Schema, model } from "mongoose";

interface ProjectInterface extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: "not started" | "in progress" | "completed";
  isActive: boolean;
  users?: Schema.Types.ObjectId[];
  tasks?: Schema.Types.ObjectId[];
}

const ProjectSchema = new Schema<ProjectInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["not started", "in progress", "completed"],
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ProjectInterface>("Project", ProjectSchema);
