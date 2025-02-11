import { Inject, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { BlogsService } from 'src/blogs/blogs.service';
import { BlogsModule } from 'src/blogs/blogs.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BlogsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 3,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, BlogsService,
    {
      provide : APP_GUARD,
      useClass : ThrottlerGuard
    }
  ],
})
export class UsersModule {}
