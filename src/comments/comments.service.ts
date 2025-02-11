import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/Comment';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/CreateComment.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationGuard } from 'src/auth/guards/access.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class CommentsService {
  // all Comment related actions here
  constructor(
    @InjectRepository(Comment)
    private readonly CommentRepository: Repository<Comment>,
  ) {}

  createComment(createCommentDto: CreateCommentDto) {
    // this is done after validation
    const newComment: Comment = this.CommentRepository.create({
      content: createCommentDto.content,
      is_public: createCommentDto.is_public ? true : false,
      author_id: createCommentDto.author_id,
      blog_id: createCommentDto.blog_id,
    });
    return this.CommentRepository.save(newComment);
  }

  readComment(id: number): Promise<Comment | null> {
    return this.CommentRepository.findOneBy({ id });
  }

  updateComment(id: number, updateComment: {}) {
    return this.CommentRepository.update(id, updateComment);
  }

  deleteComment(Comment_id: number) {
    return this.CommentRepository.delete(Comment_id);
  }

  async getRangeComments(from: number = 1, to: number = 1e9) {
    const reqcomments = await this.CommentRepository.find({
      take: to - from + 1,
      skip: from - 1,
    });
    return reqcomments;
  }
}
