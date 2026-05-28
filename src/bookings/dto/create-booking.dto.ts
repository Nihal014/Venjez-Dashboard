import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  customer_name: string;

  @IsString()
  phone_number: string;

  @IsString()
  event_type: string;

  @IsDateString()
  event_date: Date;

  @IsNumber()
  guest_count: number;

  @IsNumber()
  total_amount: number;

  @IsNumber()
  advance_amount: number;
}
