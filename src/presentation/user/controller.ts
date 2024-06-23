import { Request, Response } from "express";
import { UserRepository } from "../../domain/repositories/user/user.repository";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { LoginUserDto } from "../../domain/dtos/user/login-user.dto";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };
  public createUser = async (req: Request, res: Response) => {
    try {
      const [error, createUserDto] = CreateUserDto.create(req.body);
      if (error) {
        return res.status(400).json({ error });
      }

      const user = await this.userRepository.createUser(createUserDto!);

      return res.status(201).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };
  public loginUser = async (req: Request, res: Response) => {
    try {
      const [error, loginUserDto] = LoginUserDto.create(req.body);
      if (error) {
        return res.status(400).json({ error });
      }

      const token = await this.userRepository.loginUser(loginUserDto!);

      return res.status(200).json({ token });
    } catch (error) {
      this.handleError(error, res);
    }
  };
  public getProjects = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      if (!userId) {
        throw CustomError.badRequest("UserId is required");
      }

      const status = req.query.status as
        | "not started"
        | "in progress"
        | "completed"
        | undefined;

      const projects = await this.userRepository.getProjects(userId, status);

      return res.status(200).json(projects);
    } catch (error) {
      this.handleError(error, res);
    }
  };
  public getTasks = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      if (!userId) {
        throw CustomError.badRequest("UserId is required");
      }

      const status = req.query.status as
        | "not started"
        | "in progress"
        | "completed"
        | undefined;

      const tasks = await this.userRepository.getTasks(userId, status);

      return res.status(200).json(tasks);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
