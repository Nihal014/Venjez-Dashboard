import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly booking_repository: Repository<Booking>,
  ) {}

  create(create_booking_dto: CreateBookingDto) {
    const booking =
      this.booking_repository.create(create_booking_dto);

    return this.booking_repository.save(booking);
  }

  findAll() {
    return this.booking_repository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.booking_repository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    update_booking_dto: UpdateBookingDto,
  ) {
    await this.booking_repository.update(
      id,
      update_booking_dto,
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    const booking = await this.findOne(id);

    if (booking) {
      await this.booking_repository.delete(id);
    }

    return {
      message: 'Booking deleted successfully',
    };
  }
}