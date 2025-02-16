import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/Comment';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/CreateComment.dto';
import { error } from 'console';

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

  nextCommentSet(pageNo: number = 1, pageSize: number) {
    return this.getRangeComments(pageNo * pageSize, (pageNo + 1) * pageSize, 20);
  }

  prevCommentSet(pageNo: number = 2, pageSize: number) {
    if(pageNo < 2) return error(`no prev Comment pages`)
    return this.getRangeComments((pageNo - 2) * pageSize, (pageNo - 1)  * pageSize, 20);
  }

  thisCommentSet(pageNo: number = 1, pageSize: number) {
    return this.getRangeComments((pageNo - 1) * pageSize, pageNo * pageSize, 20);
  }
  
  async getRangeComments(from: number = 1, to: number = 1e9, limit: number) {
    if (to - from + 1 > limit)
      return error(
        `too many Comments requested per call, max limit is : ${limit}`,
      );
    const reqComments = await this.CommentRepository.find({
      take: to - from + 1,
      skip: from - 1,
    });
    return reqComments;
  }
}
