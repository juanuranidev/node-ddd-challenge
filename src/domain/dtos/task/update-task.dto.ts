export class UpdateTaskDto {
  private constructor(
    public readonly taskId: number,
    public readonly title: string,
    public readonly description: string,
    public readonly dueDate: Date,
    public readonly status: "not started" | "in progress" | "completed",
    public readonly users?: string[]
  ) {}

  static create(data: { [key: string]: any }): [string?, UpdateTaskDto?] {
    const { taskId, title, description, dueDate, status, users } = data;

    if (!taskId) return ["taskId is required", undefined];
    if (!title) return ["title is required", undefined];
    if (!description) return ["description is required", undefined];
    if (!dueDate) return ["dueDate is required", undefined];
    if (!status) return ["status is required", undefined];
    if (!["not started", "in progress", "completed"].includes(status)) {
      ["invalid status", undefined];
    }

    return [
      undefined,
      new UpdateTaskDto(taskId, title, description, dueDate, status, users),
    ];
  }
}
