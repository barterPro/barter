import { Module } from '@nestjs/common';
import { AddressesController } from './address.controller';
import { AddressesService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
