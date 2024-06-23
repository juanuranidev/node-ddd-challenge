import { CreateProjectDto } from "../../dtos/project/create-project.dto";
import { UpdateProjectDto } from "../../dtos/project/update-project.dto";
import { ProjectEntity } from "../../entities/project/project.entity";
import { CustomError } from "../../errors/custom.error";

export abstract class ProjectRepository {
  abstract createProject(
    createProjectDto: CreateProjectDto
  ): Promise<ProjectEntity | CustomError>;
  abstract readProject(projectId: string): Promise<ProjectEntity | CustomError>;
  abstract updateProject(
    updateProjectDto: UpdateProjectDto
  ): Promise<ProjectEntity | CustomError>;
  abstract deleteProject(
    projectId: string
  ): Promise<ProjectEntity | CustomError>;
}
