import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Webhook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  source: string;

  @Column()
  eventType: string;

  @Column('jsonb')
  payload: any;

  @CreateDateColumn()
  receivedAt: Date;
}
