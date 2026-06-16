import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config_service: ConfigService) => ({
        secret: config_service.get<string>('JWT_SECRET'),

        signOptions: {
          expiresIn: config_service.get('JWT_EXPIRES_IN') as any,
        },
      }),
    }),
  ],
})
export class AuthModule {}


/*
JwtModule is a module provided by NestJS.It contains everything needed to work with JWTs


registerAsync() is just a way to tell Nest:

"Don't configure this module immediately. First run some code, get the values I need, then configure it."

Normal register()

You already know this:

JwtModule.register({
  secret: 'venjez-secret',
  signOptions: {
    expiresIn: '1d',
  },
})

Here Nest already has all values.

Think:

Create JwtModule
using these settings.
registerAsync()

Now suppose the secret comes from:

JWT_SECRET=venjez-super-secret-key

Nest must first:

Load .env
↓
Create ConfigService
↓
Read JWT_SECRET
↓
Create JwtModule

So we use:

JwtModule.registerAsync({
  inject: [ConfigService],

  useFactory: (
    config_service: ConfigService,
  ) => ({
    secret:
      config_service.get(
        'JWT_SECRET',
      ),
  }),
})
Why "Async"?

Because Nest says:

I may need to wait
before I can create this module.

Maybe waiting for:

ConfigService
Database settings
API secrets
External service configuration
What Happens In Your Case

Nest startup:

App Starts
↓
ConfigModule loads .env
↓
ConfigService created
↓
registerAsync runs
↓
useFactory executes
↓
Returns JWT configuration
↓
JwtModule created
↓
JwtService becomes available
Simplified Version

Your code:

JwtModule.registerAsync({
  inject: [ConfigService],

  useFactory: (
    config_service: ConfigService,
  ) => ({
    secret:
      config_service.get(
        'JWT_SECRET',
      ),
  }),
})

is basically:

const jwt_config = {
  secret:
    config_service.get(
      'JWT_SECRET',
    ),
};

JwtModule.register(jwt_config);

The difference is Nest is responsible for getting config_service and calling the function.






Good. Once you understand ConfigService, ConfigModule will make complete sense.

First, What Problem Does ConfigService Solve?

Suppose you have:

DATABASE_URL=postgresql://...
JWT_SECRET=venjez-super-secret-key
JWT_EXPIRES_IN=1d

These are environment variables.

Node.js can access them using:

process.env.JWT_SECRET

or

process.env.DATABASE_URL
Without ConfigService

You could write:

const secret = process.env.JWT_SECRET;

everywhere in your application.

This works.

But NestJS prefers dependency injection.

Instead of accessing globals directly, Nest provides a service:

ConfigService
What ConfigModule Does

When you wrote:

ConfigModule.forRoot({
  isGlobal: true,
})

Nest:

Reads your .env
Creates a ConfigService
Registers it in the dependency injection container

Think:

.env
 ↓
ConfigModule
 ↓
ConfigService
 ↓
Your code
How To Use It

Just like UsersService.

You injected:

constructor(
  private readonly usersService: UsersService,
) {}

Similarly:

constructor(
  private readonly configService: ConfigService,
) {}

Now you can do:

const secret =
  this.configService.get(
    'JWT_SECRET',
  );

and get:

venjez-super-secret-key
Example

Imagine your .env:

APP_NAME=Venjez

Then:

constructor(
  private readonly configService: ConfigService,
) {}

getName() {
  return this.configService.get(
    'APP_NAME',
  );
}

returns:

Venjez
Why Not Just Use process.env?

Both work.

These are equivalent:

process.env.JWT_SECRET

and

this.configService.get(
  'JWT_SECRET',
);

But NestJS prefers:

ConfigService

because:

It uses dependency injection
Easier to mock during testing
Centralized configuration
Consistent NestJS pattern
Why Inject It Into JwtModule?

Your code:

JwtModule.registerAsync({
  inject: [ConfigService],

  useFactory: (
    config_service: ConfigService,
  ) => ({
    secret:
      config_service.get(
        'JWT_SECRET',
      ),
  }),
})

means:

Nest:

1. Give me ConfigService
2. Read JWT_SECRET from .env
3. Use it to configure JwtModule
Mental Model

Think of ConfigService as a wrapper around .env.

.env file
    ↓
ConfigModule loads it
    ↓
ConfigService provides access
    ↓
Your modules/services use it

So when you see:

config_service.get('JWT_SECRET')

just mentally translate it to:

process.env.JWT_SECRET

The value is the same. The difference is that one follows NestJS's dependency injection system.

*/