import { Module } from '@nestjs/common';
// import { ProductsModule } from './core/products/products.module';
// import { ServicesModule } from './core/services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from './core/users/users.module';
import { CategoriesModule } from './core/categories/categories.module';
import { TagsModule } from './core/tags/tags.module';
import { ServicesModule } from './core/services/services.module';
import { AddressesModule } from './core/addresses/addresses.module';
import { CartsModule } from './core/carts/carts.module';
import { CouponsModule } from './core/coupons/coupons.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CategoriesModule,
    TagsModule,
    ServicesModule,
    AddressesModule,
    CartsModule,
    CouponsModule,
  ],
})
export class AppModule {}
