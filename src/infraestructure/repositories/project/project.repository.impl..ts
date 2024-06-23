import { CustomError } from "../../../domain/errors/custom.error";
import { ProjectRepository } from "../../../domain/repositories/project/project.repository";
import { CreateProjectDto } from "../../../domain/dtos/project/create-project.dto";
import { UpdateProjectDto } from "../../../domain/dtos/project/update-project.dto";
import { ProjectEntity } from "../../../domain/entities/project/project.entity";
import ProjectSchema from "../../db/schemas/project/project.schemas";

export class ProjectRepositoryImpl implements ProjectRepository {
  async createProject(
    createProjectDto: CreateProjectDto
  ): Promise<ProjectEntity | CustomError> {
    try {
      const { title, description, dueDate, status, users, tasks } =
        createProjectDto;

      const newProject = new ProjectSchema({
        title,
        description,
        dueDate,
        status,
        users,
        tasks,
      });

      const savedProject = await newProject.save();

      return ProjectEntity.create(savedProject);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readProject(projectId: string): Promise<ProjectEntity | CustomError> {
    try {
      const project = await ProjectSchema.findOne({
        _id: projectId,
        isActive: true,
      }).exec();

      if (!project) {
        throw CustomError.notFound(`Project with Id ${projectId} not found.`);
      }

      return ProjectEntity.create(project);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(String(error));
    }
  }
  async updateProject(
    updateProjectDto: UpdateProjectDto
  ): Promise<ProjectEntity | CustomError> {
    try {
      const { projectId, title, description, dueDate, status, users, tasks } =
        updateProjectDto;

      const updatedProject = await ProjectSchema.findOneAndUpdate(
        { _id: projectId, isActive: true },
        { title, description, dueDate, status, users, tasks },
        { new: true }
      ).exec();

      if (!updatedProject) {
        return CustomError.notFound(`Project with id ${projectId} not found.`);
      }

      return ProjectEntity.create(updatedProject);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async deleteProject(projectId: string): Promise<ProjectEntity | CustomError> {
    try {
      const deletedProject = await ProjectSchema.findOneAndUpdate(
        { _id: projectId, isActive: true },
        { isActive: false },
        { new: true }
      ).exec();

      if (!deletedProject) {
        return CustomError.notFound(`Project with id ${projectId} not found.`);
      }

      return ProjectEntity.create(deletedProject);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
