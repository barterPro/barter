import { CreateProductDto } from './dtos/product-dtos';
import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Query,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CustomSerializerInterceptor } from '../../serializers/serializer';

@Controller('products')
@UseInterceptors(CustomSerializerInterceptor)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return await this.productsService.createProduct(body);
  }

  @Get()
  async listProducts(
    @Query('name') name: string,
    @Query('quantity') quantity: string,
    @Query('condition') condition: string,
  ) {
    return await this.productsService.findAllProducts(
      name,
      quantity,
      condition,
    );
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    return await this.productsService.findOneProduct(id);
  }

  @Patch('/:id')
  async updateProduct(@Body() body: Partial<Product>, @Param('id') id: string) {
    return await this.productsService.updateOneProduct(id, body);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteOneProduct(id);
  }
}
