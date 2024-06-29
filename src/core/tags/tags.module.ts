import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagsService } from './tags.service';
import { TagsControllers } from './tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsControllers],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
