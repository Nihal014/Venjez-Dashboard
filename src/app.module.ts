import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BookingsModule } from './bookings/bookings.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,  //Normally you would have to register every entity manually. Without autoLoadEntities:entities: [Venue, Customer],With:autoLoadEntities: trueNest automatically finds all entities imported through TypeOrmModule.forFeature().
      synchronize: true,   //
    }),
    BookingsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//What ConfigModule Does

//It loads environment variables from:

//What isGlobal: true Means

//Without it, every module that wants access to configuration must import:
