import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from '../categories/dtos/create-category';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagsRepository: Repository<Tag>) {}

  async createTag(body: CreateCategoryDto) {
    const tag = await this.tagsRepository.create(body);

    return await this.tagsRepository.save(tag);
  }

  async findAllTags() {
    return await this.tagsRepository.find();
  }

  async findOneTag(id: string) {
    const tag = await this.tagsRepository.findOneBy({ id });

    if (!tag) throw new NotFoundException('Tag does not exist');

    return tag;
  }

  async updateOneTag(id: string, updates: Partial<Tag>) {
    const tag = await this.tagsRepository.findOneBy({ id });

    if (!tag) throw new NotFoundException('Tag does not exist');

    const updatedTag = { ...tag, ...updates };

    return await this.tagsRepository.save(updatedTag);
  }

  async deleteOneTag(id: string) {
    const tag = await this.tagsRepository.findOneBy({ id });

    if (!tag) throw new NotFoundException('Tag does not exist');

    return await this.tagsRepository.remove(tag);
  }
}
