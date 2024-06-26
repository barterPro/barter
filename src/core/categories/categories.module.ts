import { Module } from '@nestjs/common';

import { CategoriesControllers } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesControllers],
  providers: [CategoriesService],
})
export class CategoriesModule {}
