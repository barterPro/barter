import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { Product } from '../products/product.entity';
import { Storage } from '../storage/storage.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
  ) {}

  async createInventory(
    productId: string,
    storageId: string,
    quantity: number,
  ): Promise<Inventory> {
    const product = await this.productRepository.findOneBy({ id: productId });
    const storage = await this.storageRepository.findOneBy({ id: storageId });
    const inventory = this.inventoryRepository.create({
      product,
      storage,
      quantity,
      available: quantity,
    });
    return this.inventoryRepository.save(inventory);
  }

  async updateInventory(
    inventoryId: string,
    quantity: number,
  ): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOneBy({
      id: inventoryId,
    });
    inventory.quantity = quantity;
    inventory.available = quantity - inventory.reserved;
    return this.inventoryRepository.save(inventory);
  }

  async reserveStock(
    inventoryId: string,
    quantity: number,
  ): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOneBy({
      id: inventoryId,
    });
    if (inventory.available < quantity) {
      throw new Error('Insufficient stock available');
    }
    inventory.reserved += quantity;
    inventory.available -= quantity;
    return this.inventoryRepository.save(inventory);
  }

  async releaseStock(
    inventoryId: string,
    quantity: number,
  ): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOneBy({
      id: inventoryId,
    });
    if (inventory.reserved < quantity) {
      throw new Error('Insufficient stock reserved');
    }
    inventory.reserved -= quantity;
    inventory.available += quantity;
    return this.inventoryRepository.save(inventory);
  }
}
