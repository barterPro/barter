import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category';
import { UpdateCategoryDto } from './dtos/update-category';

@Controller('categories')
export class CategoriesControllers {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(@Query('name') name: string) {
    return await this.categoriesService.getAllCategories(name);
  }

  @Get('/:id')
  async getOneCategory(@Param('id') id: string) {
    return await this.categoriesService.getOneCategory(id);
  }

  @Post('/admin')
  async createCategory(@Body() body: CreateCategoryDto) {
    return await this.categoriesService.createCategory(body);
  }

  @Patch('/admin/:id')
  async updateCategory(
    @Body() body: UpdateCategoryDto,
    @Param('id') id: string,
  ) {
    return await this.categoriesService.updateCategory(id, body);
  }

  @Delete('/admin/:id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoriesService.deleteCategory(id);
  }
}
