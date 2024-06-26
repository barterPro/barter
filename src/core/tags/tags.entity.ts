import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';
// import { Product } from '../products/product.entity';
// import { Service } from '../services/service.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @ManyToMany(() => Product)
  // @JoinTable()
  // products: Product[];

  // @ManyToMany(() => Service)
  // @JoinTable()
  // services: Service[];
}
