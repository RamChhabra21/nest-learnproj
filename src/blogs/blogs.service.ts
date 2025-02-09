import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/typeorm/Blog';
import { FindOptionsWhere, QueryBuilder, Repository } from 'typeorm';
import { CreateBlogDto } from './dto/CreateBlog.dto';
import { Comment } from 'src/typeorm/Comment';
import { GlobalService } from 'src/utils/global.service';

@Injectable()
export class BlogsService {
  // all blog related actions here
    constructor(@InjectRepository(Blog) private readonly BlogRepository : Repository<Blog>,
    @InjectRepository(Comment) private readonly CommentRepository : Repository<Comment>){}

  createBlog(createBlogDto: CreateBlogDto) {
    // this is done after validation
    const newBlog: Blog = this.BlogRepository.create({
      content: createBlogDto.content,
      is_public: createBlogDto.is_public ? true : false,
      author_id: createBlogDto.author_id,
    });
    return this.BlogRepository.save(newBlog);
  }

  readBlog(id: number): Promise<Blog | null> {
    return this.BlogRepository.findOneBy({ id });
  }

  async updateBlog(id: number, updateBlog: {}) {
    return this.BlogRepository.update(id, updateBlog);
  }

  async deleteBlog(blog_id: number) {
    return this.BlogRepository.delete(blog_id);
  }

  getComments(blog_id: number) {
    // perform joins etc in blog and comment repo to get comments
    const conditions = {
      ...(blog_id ? { blog_id } : {})
    };

    return this.CommentRepository.find({
      where : conditions,
    });
  }
}
