import { CustomError } from "../../domain/errors/custom.error";
import { Request, Response } from "express";
import { TaskRepository } from "../../domain/repositories/task/task.repository";
import { UpdateTaskDto } from "../../domain/dtos/task/update-task.dto";
import { CreateTaskDto } from "../../domain/dtos/task/create-task.dto";

export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };
  public createTask = async (req: Request, res: Response) => {
    try {
      const [error, createTaskDto] = CreateTaskDto.create(req.body);
      if (error) {
        return res.status(400).json({ error });
      }

      const task = await this.taskRepository.createTask(createTaskDto!);

      return res.status(201).json(task);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public readTask = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      if (!taskId) {
        return res.status(400).json({ message: "TaskId is required" });
      }

      const task = await this.taskRepository.readTask(taskId);

      return res.status(200).json(task);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public updateTask = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      const data = req.body;

      if (!taskId) {
        return res.status(400).json({ message: "TaskId is required" });
      }

      const [error, updateTaskDto] = UpdateTaskDto.create({
        ...data,
        taskId,
      });
      if (error) {
        return res.status(400).json({ error: error });
      }

      const updatedTask = await this.taskRepository.updateTask(updateTaskDto!);

      return res.status(200).json(updatedTask);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public deleteTask = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      if (!taskId) {
        return res.status(400).json({ message: "TaskId is required" });
      }

      const deletedTask = await this.taskRepository.deleteTask(taskId);

      return res.status(200).json(deletedTask);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
