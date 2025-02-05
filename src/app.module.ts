import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsModule } from './blogs/blogs.module';
import entities, { User } from './typeorm/Entities'
import { Blog } from './typeorm/Blog';

@Module({
  imports: [UsersModule, AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'test_db',
      entities: [User,Blog,__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
