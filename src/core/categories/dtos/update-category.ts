import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
