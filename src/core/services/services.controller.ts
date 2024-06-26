import { Body, Controller, Post } from '@nestjs/common';

import { ServicesService } from './services.service';
import { CreateTagDto } from '../tags/dtos/create-tag';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Post()
  async createService(@Body() body: CreateTagDto) {
    console.log(body);
  }

  async getAllServices() {}

  async getOneService() {}

  async updateService() {}

  async deleteService() {}
}
