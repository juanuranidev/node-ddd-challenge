import { TaskEntity } from "../task/task.entity";
import { UserEntity } from "../user/user.entity";

export class ProjectEntity {
  constructor(
    public title: string,
    public description: string,
    public dueDate: Date,
    public status: "not started" | "in progress" | "completed",
    public isActive: boolean,
    public users?: UserEntity[],
    public tasks?: TaskEntity[]
  ) {}

  public static create(data: { [key: string]: any }): ProjectEntity {
    const { title, description, dueDate, status, isActive, users, tasks } =
      data;

    if (!title) throw "title is required";
    if (!description) throw "description is required";
    if (!dueDate) throw "dueDate is required";
    if (!status) throw "status is required";
    if (isActive === null) throw "isActive is required";
    if (!["not started", "in progress", "completed"].includes(status)) {
      throw new Error("Invalid status.");
    }

    return new ProjectEntity(
      title,
      description,
      dueDate,
      status,
      isActive,
      users,
      tasks
    );
  }
}
