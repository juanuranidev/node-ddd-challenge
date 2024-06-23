import { UserRepository } from "../../../domain/repositories/user/user.repository";
import { CreateUserDto } from "../../../domain/dtos/user/create-user.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { UserEntity } from "../../../domain/entities/user/user.entity";
import ProjectSchema from "../../db/schemas/project/project.schemas";
import TaskSchema from "../../db/schemas/task/task.schemas";
import UserSchema from "../../db/schemas/user/user.schemas";
import { TaskEntity } from "../../../domain/entities/task/task.entity";
import { jwtAdapter } from "../../../config/adapters/jwt.adapter";
import { bcryptAdapter } from "../../../config/adapters/bcrypt.adapter";
import { LoginUserDto } from "../../../domain/dtos/user/login-user.dto";

export class UserRepositoryImpl implements UserRepository {
  async createUser(
    createUserDto: CreateUserDto
  ): Promise<UserEntity | CustomError> {
    try {
      const { username, password } = createUserDto;

      const hashedPassword = await bcryptAdapter.hashPassword(password);

      const newUser = new UserSchema({ username, password: hashedPassword });
      const savedUser = await newUser.save();

      const token = jwtAdapter.generateToken({
        id: savedUser.id,
        username: savedUser.username,
      });

      const userEntity = new UserEntity(
        savedUser._id!.toString(),
        savedUser.username
      );

      userEntity.token = token;

      return userEntity;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer();
    }
  }
  async loginUser(
    loginUserDto: LoginUserDto
  ): Promise<UserEntity | CustomError> {
    try {
      const { username, password } = loginUserDto;

      const user = await UserSchema.findOne({ username });
      if (!user) {
        throw CustomError.notFound("User not found");
      }

      const passwordMatch = await bcryptAdapter.comparePasswords(
        password,
        user.password
      );
      if (!passwordMatch) {
        throw CustomError.unauthorized("Invalid password");
      }

      const token = jwtAdapter.generateToken({
        id: user._id!.toString(),
        username: user.username,
      });

      const userEntity = new UserEntity(user._id!.toString(), user.username);

      userEntity.token = token;

      return userEntity;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer();
    }
  }
  async getProjects(
    userId: string,
    status?: "not started" | "in progress" | "completed"
  ): Promise<any> {
    try {
      let projectsQuery = ProjectSchema.find({});

      if (userId) {
        projectsQuery = projectsQuery.where("users").in([userId]);
      }

      if (status) {
        projectsQuery = projectsQuery.where("status").equals(status);
      }

      const projects = await projectsQuery.exec();

      return projects;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer();
    }
  }
  async getTasks(
    userId: string,
    status?: "not started" | "in progress" | "completed"
  ): Promise<any> {
    try {
      let tasksQuery = TaskSchema.find({});

      if (userId) {
        tasksQuery = tasksQuery.where("users").in([userId]);
      }

      if (status) {
        tasksQuery = tasksQuery.where("status").equals(status);
      }

      const tasks = await tasksQuery.exec();

      return tasks.map((task) => TaskEntity.create(task));
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer();
    }
  }
}
