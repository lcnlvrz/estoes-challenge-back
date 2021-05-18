import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { ProjectEntity } from './project.entity';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async executeFindMany(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<ProjectEntity>> {
    return await this.projectService.findManyPagination(page, limit);
  }

  @Post()
  async executeCreateProject(
    @Body() CreateProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    return await this.projectService.create(CreateProjectDto);
  }

  @Put(':id')
  async executeUpdateProject(
    @Body() UpdateProjectDto: UpdateProjectDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateProjectDto> {
    const project = await this.projectService.findOneById(id);
    return await this.projectService.update(UpdateProjectDto, project);
  }

  @Delete(':id')
  async executeRemoveOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectEntity> {
    const project = await this.projectService.findOneById(id);
    return await this.projectService.removeOne(project);
  }
}
