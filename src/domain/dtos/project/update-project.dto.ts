export class UpdateProjectDto {
  private constructor(
    public readonly projectId: number,
    public readonly title: string,
    public readonly description: string,
    public readonly dueDate: Date,
    public readonly status: "not started" | "in progress" | "completed",
    public readonly users?: string[],
    public readonly tasks?: string[]
  ) {}

  static create(data: { [key: string]: any }): [string?, UpdateProjectDto?] {
    const { projectId, title, description, dueDate, status, users, tasks } =
      data;

    if (!projectId) return ["projectId is required", undefined];
    if (!title) return ["title is required", undefined];
    if (!description) return ["description is required", undefined];
    if (!dueDate) return ["dueDate is required", undefined];
    if (!status) return ["status is required", undefined];
    if (!["not started", "in progress", "completed"].includes(status)) {
      return ["invalid status", undefined];
    }

    return [
      undefined,
      new UpdateProjectDto(
        projectId,
        title,
        description,
        dueDate,
        status,
        users,
        tasks
      ),
    ];
  }
}
