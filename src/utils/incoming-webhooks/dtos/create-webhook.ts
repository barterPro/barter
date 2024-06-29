import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateWebhookDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  eventType: string;

  @IsObject()
  @IsNotEmpty()
  payload: any;
}
