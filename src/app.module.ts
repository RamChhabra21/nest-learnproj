import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsModule } from './blogs/blogs.module';
import entities, { User } from './typeorm/Entities';
import { Blog } from './typeorm/Blog';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './typeorm/Comment';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: (process.env.db_port ? parseInt(process.env.db_port) : 3306),
      username: process.env.db_username,
      password: process.env.db_password,
      database: process.env.db_name,
      entities: [User, Blog, Comment, __dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    BlogsModule,
    CommentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
