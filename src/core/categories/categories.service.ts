import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

import { CreateCategoryDto } from './dtos/create-category';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getAllCategories(name: string) {
    return await this.categoriesRepository.find({ where: { name } });
  }

  async getOneCategory(id: string) {
    return await this.categoriesRepository.findOneBy({ id });
  }

  async createCategory(newCategory: CreateCategoryDto) {
    const category = this.categoriesRepository.create(newCategory);

    return await this.categoriesRepository.save(category);
  }

  async updateCategory(id: string, updates: Partial<Category>) {
    const category = this.categoriesRepository.findOneBy({ id });

    if (!category) throw new NotFoundException('Category does not exist');

    const updatedCategory = { ...category, ...updates };

    return await this.categoriesRepository.save(updatedCategory);
  }

  async deleteCategory(id: string) {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category) throw new NotFoundException('Category does not exist');

    return await this.categoriesRepository.remove(category);
  }
}
