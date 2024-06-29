import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  provider: string;

  @IsString()
  duration: string;

  @IsNumber()
  price: number;

  @IsNumber()
  rating: number;

  @IsNumber()
  discount: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  variations?: { [key: string]: string | number }[];

  @IsString()
  imageUrl: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  reviews?: {
    userId: string;
    rating: number;
    comment: string;
    date: Date;
  }[];

  @IsOptional()
  @IsArray()
  tags: number[];

  @IsOptional()
  @IsArray()
  categories: number[];
}
