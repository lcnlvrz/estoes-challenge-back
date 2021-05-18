import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export enum Creator {
  NAME1 = 'Luciano Alvarez',
  NAME2 = 'Luciano Alvarez 2',
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Creator)
  @IsString()
  @IsNotEmpty()
  projectManager: string;

  @IsEnum(Creator)
  @IsString()
  @IsNotEmpty()
  assignedTo: string;

  @IsString()
  status: string;
}
