import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // OneToMany,
  // ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Product } from '../products/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  // @ManyToOne(() => Category, (category) => category.subcategories, {
  //   nullable: true,
  // })
  // parent: Category;

  // @OneToMany(() => Category, (category) => category.parent)
  // subcategories: Category[];

  // @OneToMany(() => Product, (product) => product.category)
  // products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
