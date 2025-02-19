import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/typeorm/Blog';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/CreateBlog.dto';
import { Comment } from 'src/typeorm/Comment';
import { error } from 'console';
import OpenAI from 'openai';

@Injectable()
export class BlogsService {
  // all blog related actions here
  constructor(
    @InjectRepository(Blog) private readonly BlogRepository: Repository<Blog>,
    @InjectRepository(Comment)
    private readonly CommentRepository: Repository<Comment>,
  ) {}

  openai = new OpenAI({
    apiKey : `${process.env.OPENAI_API_KEY}`
  });  

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

  nextBlogSet(pageNo: number = 1, pageSize: number) {
    return this.getRangeBlogs(
      +pageNo * +pageSize + 1,
      (+pageNo + 1) * +pageSize,
      20,
    );
  }

  prevBlogSet(pageNo: number = 2, pageSize: number) {
    if (pageNo < 2) return error(`no prev blog pages`);
    return this.getRangeBlogs(
      (+pageNo - 2) * +pageSize + 1,
      (+pageNo - 1) * +pageSize,
      20,
    );
  }

  thisBlogSet(pageNo: number = 1, pageSize: number) {
    return this.getRangeBlogs(
      (+pageNo - 1) * +pageSize + 1,
      +pageNo * +pageSize,
      20,
    );
  }

  async getRangeBlogs(from: number = 1, to: number = 1e9, limit: number) {
    if (to - from + 1 > limit) {
      return error(
        `too many blogs requested per call, max limit is : ${limit}`,
      );
    }
    const reqblogs = await this.BlogRepository.find({
      take: to - from + 1,
      skip: from - 1,
    });
    return reqblogs;
  }

  getComments(blog_id: number) {
    // perform operations (no joins req as of now) etc in blog and comment repo to get comments
    const conditions = {
      ...(blog_id ? { blog_id } : {}),
    };

    return this.CommentRepository.find({
      where: conditions,
    });
  }

  async getSummary(blog_id: number) {
    const blog = await this.readBlog(blog_id);
    console.log(blog?.content)
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: `Generate a very brief blog summary in very simple english in less than 50 words for the blog content : \n ${blog?.content}`,
        },
      ],
      store: true,
    });
    return completion.choices[0].message
  }
}
