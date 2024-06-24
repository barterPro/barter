import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/product-dtos';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async createProduct(newProduct: CreateProductDto) {
    const product = await this.productsRepository.create(newProduct);

    return await this.productsRepository.save(product);
  }

  async findAllProducts(name: string, quantity: string, condition: string) {
    const query = {
      ...(name && { name }),
      ...(quantity && { quantity: +quantity }),
      ...(condition && { condition: condition }),
    };

    return await this.productsRepository.find({
      where: query,
    });
  }

  async findOneProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id: +id });

    if (!product) {
      throw new NotFoundException('Product does not exist');
    }

    return product;
  }

  async updateOneProduct(id: string, updates: Partial<Product>) {
    const product = await this.productsRepository.findOneBy({ id: +id });

    if (!product) {
      throw new NotFoundException('Product does not exist');
    }

    const updatedProduct = { ...product, updates };

    return await this.productsRepository.save(updatedProduct);
  }

  async deleteOneProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id: +id });

    if (!product) {
      throw new NotFoundException('Product does not exist');
    }

    return await this.productsRepository.remove(product);
  }
}
