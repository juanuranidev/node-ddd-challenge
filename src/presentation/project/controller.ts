import { CustomError } from "../../domain/errors/custom.error";
import { CreateProjectDto } from "../../domain/dtos/project/create-project.dto";
import { Request, Response } from "express";
import { ProjectRepository } from "../../domain/repositories/project/project.repository";
import { UpdateProjectDto } from "../../domain/dtos/project/update-project.dto";

export class ProjectController {
  constructor(private readonly projectRepository: ProjectRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };
  public createProject = async (req: Request, res: Response) => {
    try {
      const [error, createProjectDto] = CreateProjectDto.create(req.body);
      if (error) {
        return res.status(400).json({ error });
      }

      const project = await this.projectRepository.createProject(
        createProjectDto!
      );

      return res.status(201).json(project);
    } catch (error) {
      this.handleError(error, res);
    }
  };
  public readProject = async (req: Request, res: Response) => {
    try {
      const projectId = req.params.id;
      if (!projectId) {
        return res.status(400).json({ message: "ProjectId is required" });
      }

      const project = await this.projectRepository.readProject(projectId);

      return res.status(200).json(project);
    } catch (error) {
      this.handleError(error, res);
    }
  };
  public updateProject = async (req: Request, res: Response) => {
    try {
      const projectId = req.params.id;
      if (!projectId) {
        return res.status(400).json({ message: "ProjectId is required" });
      }

      const [error, updateProjectDto] = UpdateProjectDto.create({
        ...req.body,
        projectId,
      });
      if (error) {
        return res.status(400).json({ error: error });
      }

      const updatedProject = await this.projectRepository.updateProject(
        updateProjectDto!
      );

      return res.status(200).json(updatedProject);
    } catch (error) {
      this.handleError(error, res);
    }
  };
  public deleteProject = async (req: Request, res: Response) => {
    try {
      const projectId = req.params.id;
      if (!projectId) {
        return res.status(400).json({ message: "ProjectId is required" });
      }

      const deletedProject = await this.projectRepository.deleteProject(
        projectId
      );

      return res.status(200).json(deletedProject);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
