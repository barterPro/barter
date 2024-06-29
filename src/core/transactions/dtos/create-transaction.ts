import { IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { TransactionType } from '../transaction.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  balanceId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsOptional()
  referenceId?: string;
}
