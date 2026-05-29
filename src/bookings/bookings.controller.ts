import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly booking_service: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.booking_service.create(createBookingDto);
  }

  @Get()
  findAll(
    @Query('key') key?: string,

    @Query('status') status?: string,

    @Query('from_date')
    from_date?: string,

    @Query('to_date')
    to_date?: string,
  ) {
    return this.booking_service.findAll({
      key,
      status,
      from_date,
      to_date,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booking_service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.booking_service.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booking_service.remove(+id);
  }
}
