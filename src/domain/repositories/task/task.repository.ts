import { CreateTaskDto } from "../../dtos/task/create-task.dto";
import { UpdateTaskDto } from "../../dtos/task/update-task.dto";
import { CustomError } from "../../errors/custom.error";
import { TaskEntity } from "../../entities/task/task.entity";

export abstract class TaskRepository {
  abstract createTask(
    createTasktDto: CreateTaskDto
  ): Promise<TaskEntity | CustomError>;
  abstract readTask(taskId: string): Promise<TaskEntity | CustomError>;
  abstract updateTask(
    updateTaskDto: UpdateTaskDto
  ): Promise<TaskEntity | CustomError>;
  abstract deleteTask(taskId: string): Promise<TaskEntity | CustomError>;
}
