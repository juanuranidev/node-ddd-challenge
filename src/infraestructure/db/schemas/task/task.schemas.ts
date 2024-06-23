import { Schema, model } from "mongoose";

interface TaskInterface extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: "not started" | "in progress" | "completed";
  isActive: boolean;
  assignedMembers?: Schema.Types.ObjectId[];
}

const TaskSchema = new Schema<TaskInterface>(
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
    assignedMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
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

export default model<TaskInterface>("Task", TaskSchema);
