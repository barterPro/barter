import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), TagsModule],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
