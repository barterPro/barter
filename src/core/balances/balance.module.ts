import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './balances.entity';
import { BalancesService } from './balances.service';
import { BalancesController } from './balances.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Balance])],
  providers: [BalancesService],
  controllers: [BalancesController],
})
export class BalanceModule {}
