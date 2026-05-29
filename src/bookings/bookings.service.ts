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
    const booking = this.booking_repository.create(create_booking_dto);

    return this.booking_repository.save(booking);
  }

  async findAll(filters: {
    key?: string;
    status?: string;
    from_date?: string;
    to_date?: string;
  }) {
    const query = this.booking_repository.createQueryBuilder('booking');

    if (filters.key) {
      query.andWhere(
        `
      (
        LOWER(booking.customer_name)
        LIKE LOWER(:customer_name)

        OR

        booking.id::text
        LIKE :booking_id
      )
      `,
        {
          customer_name: `%${filters.key}%`,
          booking_id: `%${filters.key}%`,
        },
      );
    }

    if (filters.status) {
      query.andWhere('booking.status = :status', {
        status: filters.status,
      });
    }

    if (filters.from_date && filters.to_date) {
      query.andWhere(
        `
      booking.event_date
      BETWEEN :from_date
      AND :to_date
      `,
        {
          from_date: filters.from_date,
          to_date: filters.to_date,
        },
      );
    }

    query.orderBy('booking.created_at', 'DESC');

    return query.getMany();
  }

  findOne(id: number) {
    return this.booking_repository.findOne({
      where: { id },
    });
  }

  async update(id: number, update_booking_dto: UpdateBookingDto) {
    await this.booking_repository.update(id, update_booking_dto);

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
