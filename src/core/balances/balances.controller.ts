import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { BalancesService } from './balances.service';

@Controller('balance')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Post(':userId')
  createWallet(@Param('userId') userId: number) {
    return this.balancesService.createBalance(userId);
  }

  @Get(':userId')
  getWallet(@Param('userId') userId: number) {
    return this.balancesService.getBalanceByUserId(userId);
  }

  @Patch('lock/:userId')
  lockFunds(@Param('userId') userId: number, @Body('amount') amount: number) {
    return this.balancesService.lockFunds(userId, amount);
  }

  @Patch('release/:userId')
  releaseLockedFunds(
    @Param('userId') userId: number,
    @Body('amount') amount: number,
  ) {
    return this.balancesService.releaseLockedFunds(userId, amount);
  }

  @Patch('debit/:userId')
  debitActualBalance(
    @Param('userId') userId: number,
    @Body('amount') amount: number,
  ) {
    return this.balancesService.debitActualBalance(userId, amount);
  }
}
