import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/typeorm/Blog';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/CreateBlog.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationGuard } from 'src/auth/guards/access.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class BlogsService {
  // all blog related actions here
  constructor(
    @InjectRepository(Blog) private readonly BlogRepository: Repository<Blog>,
  ) {}

  createBlog(createBlogDto: CreateBlogDto) {
    // this is done after validation
    const newBlog : Blog = this.BlogRepository.create({
        content : createBlogDto.content,
        is_public : (createBlogDto.is_public?true:false),
        author_id : createBlogDto.author_id
    });
    return this.BlogRepository.save(newBlog);
  }

  readBlog(id: number): Promise<Blog | null> {
    return this.BlogRepository.findOneBy({ id });
  }

  updateBlog(id: number, updateBlog: {}) {
    return this.BlogRepository.update(id, updateBlog);
  }

  deleteBlog(Blog_id: number) {
    return this.BlogRepository.delete(Blog_id);
  }
}
