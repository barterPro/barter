import { Module } from '@nestjs/common';
import { ProductsModule } from './core/products/products.module';
import { ServicesModule } from './core/services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './core/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductsModule,
    ServicesModule,
    UsersModule,
  ],
})
export class AppModule {}
