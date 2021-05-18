import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { ProjectEntity } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async create(CreateProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    const project = this.projectRepository.create(CreateProjectDto);
    project.createdAt = new Date().toISOString();
    return await this.projectRepository.save(project);
  }

  async update(
    UpdateProjectDto: UpdateProjectDto,
    project: ProjectEntity,
  ): Promise<ProjectEntity> {
    const projectUpdated = this.projectRepository.merge(
      project,
      UpdateProjectDto,
    );
    return await this.projectRepository.save(projectUpdated);
  }

  async findManyPagination(
    page: number,
    limit: number,
  ): Promise<Pagination<ProjectEntity>> {
    const queryBuilder = this.projectRepository.createQueryBuilder('project');
    queryBuilder.orderBy('project.createdAt', 'DESC');
    return paginate<ProjectEntity>(queryBuilder, { page, limit });
  }

  async findOneById(projectId: number): Promise<ProjectEntity> {
    return await this.projectRepository
      .createQueryBuilder('project')
      .where('project.id = :projectId', { projectId })
      .getOne();
  }

  async removeOne(project: ProjectEntity): Promise<ProjectEntity> {
    return await this.projectRepository.remove(project);
  }
}
