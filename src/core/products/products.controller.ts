import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateProductDto } from './dtos/create-product';
import { UpdateProductDto } from './dtos/update-product';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number | string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number | string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number | string): Promise<void> {
    return await this.productsService.remove(id);
  }
}
