import { UserEntity } from "../user/user.entity";

export class TaskEntity {
  constructor(
    public title: string,
    public description: string,
    public dueDate: Date,
    public status: "not started" | "in progress" | "completed",
    public isActive: boolean,
    public users?: UserEntity[]
  ) {}

  public static create(data: { [key: string]: any }): TaskEntity {
    const { title, description, dueDate, status, isActive, users } = data;

    if (!title) throw "title is required";
    if (!description) throw "description is required";
    if (!dueDate) throw "dueDate is required";
    if (!status) throw "status is required";
    if (!["not started", "in progress", "completed"].includes(status)) {
      throw new Error("Invalid status.");
    }
    if (isActive === null) throw "isActive is required";

    return new TaskEntity(title, description, dueDate, status, isActive, users);
  }
}
