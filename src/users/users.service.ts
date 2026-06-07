import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(User)
    private readonly user_repository: Repository<User>,
  ) {}

   async find_by_email(email: string) {
    return this.user_repository.findOne({
      where: {
        email,
      },
    });
  }

  async create_user(
    user_data: Partial<User>,
  ) {
    const user =
      this.user_repository.create(
        user_data,
      );

    return this.user_repository.save(
      user,
    );
  } 
}
