export class CreateProjectDto {
  private constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly dueDate: Date,
    public readonly status: "not started" | "in progress" | "completed",
    public readonly users?: string[],
    public readonly tasks?: string[]
  ) {}

  static create(data: { [key: string]: any }): [string?, CreateProjectDto?] {
    const { title, description, dueDate, status, users, tasks } = data;

    if (!title) return ["title is required", undefined];
    if (!description) return ["description is required", undefined];
    if (!dueDate) return ["dueDate is required", undefined];
    if (!status) return ["status is required", undefined];
    if (!["not started", "in progress", "completed"].includes(status)) {
      return ["invalid status", undefined];
    }

    return [
      undefined,
      new CreateProjectDto(title, description, dueDate, status, users, tasks),
    ];
  }
}
