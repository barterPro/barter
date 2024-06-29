import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  manufacturer?: string;

  @IsOptional()
  @IsString()
  weight?: string;

  @IsOptional()
  @IsString()
  dimensions?: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNumber()
  views: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  specifications?: {
    key: string;
    value: string;
  }[];

  @IsNumber()
  category: number;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  tags: number[];

  @IsOptional()
  @IsNumber()
  inventory?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  variations?: {
    name: string;
    options: string[];
  }[];

  @IsOptional()
  @IsString()
  availabilityStatus: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  attributes?: { [key: string]: string | number }[];
}
