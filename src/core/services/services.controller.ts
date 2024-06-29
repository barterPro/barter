import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dtos/create-service';
import { UpdateServiceDto } from './dtos/update-service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAllServices() {
    return this.servicesService.findAllServices();
  }

  @Get(':id')
  async findOneService(@Param('id') id: number) {
    return this.servicesService.findOneService(id);
  }

  @Post()
  async createService(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.createService(createServiceDto);
  }

  @Patch(':id')
  updateService(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.updateService(id, updateServiceDto);
  }

  @Delete(':id')
  removeService(@Param('id') id: number) {
    return this.servicesService.removeService(id);
  }
}
