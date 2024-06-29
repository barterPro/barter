import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
