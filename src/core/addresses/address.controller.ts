import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address';
import { AddressesService } from './address.service';

@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Post()
  async addAddress(@Body() body: CreateAddressDto) {
    return await this.addressesService.addAddress(body);
  }

  @Get()
  async getAllAddresses() {
    return await this.addressesService.getAllAddresses();
  }

  @Get('/:id')
  async getOneAddress(@Param('id') id: string) {
    return await this.addressesService.getOneAddress(id);
  }

  @Patch('/:id')
  async updateAddress(@Body() body: CreateAddressDto, @Param('id') id: string) {
    return await this.addressesService.updateAddress(body, id);
  }

  @Delete()
  async deleteAddress(@Param('id') id: string) {
    return await this.addressesService.deleteAddress(id);
  }
}
