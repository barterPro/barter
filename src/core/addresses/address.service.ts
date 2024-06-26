import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address) private addressesRepository: Repository<Address>,
  ) {}

  async addAddress(body: CreateAddressDto) {
    const address = await this.addressesRepository.create(body);

    return await this.addressesRepository.save(address);
  }

  async getAllAddresses() {
    return await this.addressesRepository.find();
  }

  async getOneAddress(id: string) {
    const address = await this.addressesRepository.findOneBy({ id });

    if (!address) throw new NotFoundException('Address does not exist');

    return address;
  }

  async updateAddress(updates: Partial<Address>, id: string) {
    const address = await this.addressesRepository.findOneBy({ id });

    if (!address) throw new NotFoundException('Address does not exist');

    const updatedAddress = { ...address, ...updates };

    return await this.addressesRepository.save(updatedAddress);
  }

  async deleteAddress(id: string) {
    const address = await this.addressesRepository.findOneBy({ id });

    if (!address) throw new NotFoundException('Address does not exist');

    return await this.addressesRepository.remove(address);
  }
}
