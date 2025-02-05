import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { AuthController } from 'src/auth/auth.controller';
import { User } from 'src/typeorm/User';
import { currentUser } from 'src/auth/decorators/currentUser.decorator';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}
  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get('')
  findall(@Query('name') name?: string) {
    // implement the logic to return all blogs
    // return this.blogService.findallblogs(name);
    return {};
  }

  // new blog creation
  @Post('create')
  @UsePipes(ValidationPipe)
  createblog(@Body() createBlogDto: CreateBlogDto) {
    console.log('Blog Creation Data Object Received : ', createBlogDto);
    return this.blogService.createBlog(createBlogDto);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get('get/:id')
  getblog(@Param('id') id: number) {
    return this.blogService.readBlog(id);
  }

  @Roles(['admin', 'selfblog'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Patch('update/:id')
  updateblog(@Param('id') id: number, @Body() updatedBlog: UpdateBlogDto) {
    return this.blogService.updateBlog(id, updatedBlog);
  }

  @Roles(['admin', 'selfblog'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    console.log('reached delete method');
    return this.blogService.deleteBlog(id);
  }
}
