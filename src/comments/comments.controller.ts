import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthorizationGuard } from 'src/auth/guards/access.guard';
import { CreateCommentDto } from './dto/CreateComment.dto';
import { UpdateCommentDto} from './dto/UpdateComment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly CommentService: CommentsService) {}
  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get('')
  findall(@Query('name') name?: string) {
    // implement the logic to return all Comments
    // return this.CommentService.findallComments(name);
    return {};
  }

  // new Comment creation
  @Post('create')
  @UsePipes(ValidationPipe)
  createComment(@Body() createCommentDto: CreateCommentDto) {
    console.log('Comment Creation Data Object Received : ', createCommentDto);
    return this.CommentService.createComment(createCommentDto);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get(':id')
  getComment(@Param('id') id: number) {
    return this.CommentService.readComment(id);
  }

  @Roles(['admin', 'selfComment'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Patch('update/:id')
  updateComment(@Param('id') id: number, @Body() updatedComment: UpdateCommentDto) {
    return this.CommentService.updateComment(id, updatedComment);
  }

  @Roles(['admin', 'selfComment'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    console.log('reached delete method');
    return this.CommentService.deleteComment(id);
  }
}
