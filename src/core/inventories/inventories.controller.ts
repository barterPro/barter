import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dtos/create-inventory';
import { UpdateInventoryDto } from './dtos/update-inventory';
import { ReserveStockDto } from './dtos/reserve-stock';
import { ReleaseStockDto } from './dtos/release-stock';
import { Inventory } from './inventory.entity';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  async createInventory(
    @Body() createInventoryDto: CreateInventoryDto,
  ): Promise<Inventory> {
    const { productId, storageId, quantity } = createInventoryDto;
    return this.inventoriesService.createInventory(
      productId,
      storageId,
      quantity,
    );
  }

  @Put(':id')
  async updateInventory(
    @Param('id') inventoryId: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    const { quantity } = updateInventoryDto;
    return this.inventoriesService.updateInventory(inventoryId, quantity);
  }

  @Post(':id/reserve')
  async reserveStock(
    @Param('id') inventoryId: string,
    @Body() reserveStockDto: ReserveStockDto,
  ): Promise<Inventory> {
    const { quantity } = reserveStockDto;
    try {
      return this.inventoriesService.reserveStock(inventoryId, quantity);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post(':id/release')
  async releaseStock(
    @Param('id') inventoryId: string,
    @Body() releaseStockDto: ReleaseStockDto,
  ): Promise<Inventory> {
    const { quantity } = releaseStockDto;
    try {
      return this.inventoriesService.releaseStock(inventoryId, quantity);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
