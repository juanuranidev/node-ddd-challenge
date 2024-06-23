import { CustomError } from "../../../domain/errors/custom.error";
import { TaskRepository } from "../../../domain/repositories/task/task.repository";
import { CreateTaskDto } from "../../../domain/dtos/task/create-task.dto";
import { UpdateTaskDto } from "../../../domain/dtos/task/update-task.dto";
import { TaskEntity } from "../../../domain/entities/task/task.entity";
import TaskSchema from "../../db/schemas/task/task.schemas";

export class TaskRepositoryImpl implements TaskRepository {
  async createTask(
    createTaskDto: CreateTaskDto
  ): Promise<TaskEntity | CustomError> {
    try {
      const { title, description, dueDate, status, users } = createTaskDto;

      const newTask = new TaskSchema({
        title,
        description,
        dueDate,
        status,
        users,
      });

      const savedTask = await newTask.save();

      return TaskEntity.create(savedTask);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async readTask(taskId: string): Promise<TaskEntity | CustomError> {
    try {
      const task = await TaskSchema.findOne({
        _id: taskId,
        isActive: true,
      }).exec();

      if (!task) {
        throw CustomError.notFound(`Task with id ${taskId} not found.`);
      }

      return TaskEntity.create(task);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(String(error));
    }
  }

  async updateTask(
    updateTaskDto: UpdateTaskDto
  ): Promise<TaskEntity | CustomError> {
    try {
      const { taskId, title, description, dueDate, status, users } =
        updateTaskDto;

      const updatedTask = await TaskSchema.findOneAndUpdate(
        { _id: taskId, isActive: true },
        { title, description, dueDate, status, users },
        { new: true }
      ).exec();

      if (!updatedTask) {
        return CustomError.notFound(`Task with id ${taskId} not found.`);
      }

      return TaskEntity.create(updatedTask);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async deleteTask(taskId: string): Promise<TaskEntity | CustomError> {
    try {
      const deletedTask = await TaskSchema.findOneAndUpdate(
        { _id: taskId, isActive: true },
        { isActive: false },
        { new: true }
      ).exec();

      if (!deletedTask) {
        return CustomError.notFound(`Task with id ${taskId} not found.`);
      }

      return TaskEntity.create(deletedTask);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
