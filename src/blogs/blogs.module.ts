import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/typeorm/Blog';
import { CommentsService } from 'src/comments/comments.service';
import { CommentsModule } from 'src/comments/comments.module';
import { Comment } from 'src/typeorm/Comment';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), TypeOrmModule.forFeature([Comment]) ,CommentsModule],
  exports: [TypeOrmModule.forFeature([Blog]), BlogsService],
  controllers: [BlogsController],
  providers: [BlogsService, CommentsService],
})
export class BlogsModule {}
