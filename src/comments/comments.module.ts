import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/Comment';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
