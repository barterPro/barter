import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dtos/create-service';
import { UpdateServiceDto } from './dtos/update-service';
import { Tag } from '../tags/tag.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async findAllServices() {
    return await this.servicesRepository.find({
      relations: ['tags', 'categories'],
    });
  }

  async findOneService(id: number) {
    const service = await this.servicesRepository.findOne({
      where: {
        id,
      },
      relations: ['tags', 'categories'],
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async createService(createServiceDto: CreateServiceDto) {
    const { tags: tagIds, categories: categoryIds, ...rest } = createServiceDto;

    const tags = await this.tagsRepository.findByIds(tagIds || []);
    const categories = await this.categoriesRepository.findByIds(
      categoryIds || [],
    );

    const service = this.servicesRepository.create({
      ...rest,
      tags,
      categories,
    });

    return await this.servicesRepository.save(service);
  }

  async updateService(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.servicesRepository.findOneBy({ id });
    Object.assign(service, updateServiceDto);
    return await this.servicesRepository.save(service);
  }

  async removeService(id: number) {
    const service = await this.servicesRepository.findOneBy({ id });
    return await this.servicesRepository.remove(service);
  }
}
