import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateCategoryDto } from '../categories/dtos/create-category';
import { TagsService } from './tags.service';
import { UpdateCategoryDto } from '../categories/dtos/update-category';

@Controller('tags')
export class TagsControllers {
  constructor(private tagsService: TagsService) {}

  @Post('/admin')
  async createTag(@Body() body: CreateCategoryDto) {
    return await this.tagsService.createTag(body);
  }

  @Get()
  async getAllTags() {
    return await this.tagsService.findAllTags();
  }

  @Get('/:id')
  async getOneTag(@Param('id') id: string) {
    return await this.tagsService.findOneTag(id);
  }

  @Patch('/:id')
  async updateTag(@Body() body: UpdateCategoryDto, @Param('id') id: string) {
    return await this.tagsService.updateOneTag(id, body);
  }

  @Delete('/:id')
  async deleteTag(@Param('id') id: string) {
    return await this.tagsService.deleteOneTag(id);
  }
}
