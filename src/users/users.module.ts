import { Inject, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { BlogsService } from 'src/blogs/blogs.service';
import { BlogsModule } from 'src/blogs/blogs.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BlogsModule],
  controllers: [UsersController],
  providers: [UsersService, BlogsService],
})
export class UsersModule {}
