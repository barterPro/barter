import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product';
import { UpdateProductDto } from './dtos/update-product';
import { Category } from '../categories/category.entity';
import { Tag } from '../tags/tag.entity';
import { Inventory } from '../inventories/inventory.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    @InjectRepository(Inventory)
    private readonly inventoriesRepository: Repository<Inventory>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({
      relations: ['category', 'tags', 'inventories', 'reviews', 'orderItems'],
    });
  }

  async findOne(id: number | string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
      relations: ['category', 'tags', 'inventories', 'reviews', 'orderItems'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const {
      category: categoryId,
      tags: tagIds,
      inventory: inventoryId,
      ...rest
    } = createProductDto;

    const category = await this.categoriesRepository.findOneBy({
      id: String(categoryId),
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const tags = await this.tagsRepository.findByIds(tagIds || []);
    const inventory = inventoryId
      ? await this.inventoriesRepository.findOneBy({ id: String(inventoryId) })
      : null;

    const product = this.productsRepository.create({
      ...rest,
      category,
      tags,
      inventory,
    });

    return this.productsRepository.save(product);
  }

  async update(
    id: number | string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    const {
      category: categoryId,
      tags: tagIds,
      inventory: inventoryId,
      ...rest
    } = updateProductDto;

    if (categoryId) {
      const category = await this.categoriesRepository.findOneBy({
        id: String(categoryId),
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }
      product.category = category;
    }

    if (tagIds) {
      product.tags = await this.tagsRepository.findByIds(tagIds);
    }

    if (inventoryId) {
      const inventory = await this.inventoriesRepository.findOneBy({
        id: String(inventoryId),
      });
      if (!inventory) {
        throw new NotFoundException(
          `Inventory with ID ${inventoryId} not found`,
        );
      }
      product.inventory = inventory;
    }

    Object.assign(product, rest);
    return this.productsRepository.save(product);
  }

  async remove(id: number | string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }
}
