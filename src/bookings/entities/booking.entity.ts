import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_name: string;

  @Column()
  phone_number: string;

  @Column()
  event_type: string;

  @Column({ type: 'date' })
  event_date: Date;

  @Column()
  guest_count: number;

  @Column('decimal')
  total_amount: number;

  @Column('decimal')
  advance_amount: number;

  @Column({
    default: 'confirmed',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
