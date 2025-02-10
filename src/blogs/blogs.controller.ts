import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthorizationGuard } from 'src/auth/guards/access.guard';
import { CreateBlogDto } from './dto/CreateBlog.dto';
import { UpdateBlogDto } from './dto/UpdateBlog.dto';
import { GlobalService } from 'src/utils/global.service';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  // new blog creation
  @Post('create')
  @UsePipes(ValidationPipe)
  createblog(@Body() createBlogDto: CreateBlogDto) {
    console.log('Blog Creation Data Object Received : ', createBlogDto);
    return this.blogService.createBlog(createBlogDto);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get(':id')
  getBlog(@Param('id') id: number) {
    return this.blogService.readBlog(id);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get('')
  getRangeBlogs(@Query('from') from , @Query('to') to ){
    return this.blogService.getRangeBlogs(from,to);
  }

  // fetch all comments (comment ids) related to a particular blog
  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get(':id/comments')
  getComments(@Param('id') id: number) {
    return this.blogService.getComments(id);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Patch('update/:id')
  async updateBlog(@Param('id') id: number, @Body() updatedBlog: UpdateBlogDto) {
    const blog =  await this.blogService.readBlog(id) ; 
    console.log(blog?.author_id," ", GlobalService.user_id)
    console.log(blog?.author_id !== GlobalService.user_id);
    if(blog?.author_id !== GlobalService.user_id) return new UnauthorizedException();
    return this.blogService.updateBlog(id, updatedBlog);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Delete('delete/:id')
  async deleteBlog(@Param('id') id: number) {
    const blog =  await this.blogService.readBlog(id) ; 
    if(blog?.author_id ! === GlobalService.user_id) return new UnauthorizedException();
    return this.blogService.deleteBlog(id);
  }
}
