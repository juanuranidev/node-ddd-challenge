import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { LoginUserDto } from "../../dtos/user/login-user.dto";
import { UserEntity } from "../../entities/user/user.entity";
import { CustomError } from "../../errors/custom.error";

export abstract class UserRepository {
  abstract createUser(
    createUserDto: CreateUserDto
  ): Promise<UserEntity | CustomError>;
  abstract loginUser(
    loginUserDto: LoginUserDto
  ): Promise<UserEntity | CustomError>;
  abstract getProjects(
    userId: string,
    status?: "not started" | "in progress" | "completed"
  ): Promise<UserEntity | CustomError>;
  abstract getTasks(
    userId: string,
    status?: "not started" | "in progress" | "completed"
  ): Promise<UserEntity | CustomError>;
}
