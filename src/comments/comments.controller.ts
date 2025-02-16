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

  // new Comment creation
  @Post('create')
  @UsePipes(ValidationPipe)
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.CommentService.createComment(createCommentDto);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get(':id')
  getComment(@Param('id') id: number) {
    return this.CommentService.readComment(id);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get('')
  getRangeComments(@Query('from') from , @Query('to') to ){
    return this.CommentService.getRangeComments(from,to,20);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get('')
  getNextCommentSet(@Query('pageNo') pageNo , @Query('pageSize') pageSize ){
    return this.CommentService.nextCommentSet(pageNo,pageSize);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get('')
  getThisCommentSet(@Query('pageNo') pageNo , @Query('pageSize') pageSize ){
    return this.CommentService.thisCommentSet(pageNo,pageSize);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get('')
  getPrevCommentSet(@Query('pageNo') pageNo , @Query('pageSize') pageSize ){
    return this.CommentService.prevCommentSet(pageNo,pageSize);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Patch('update/:id')
  updateComment(@Param('id') id: number, @Body() updatedComment: UpdateCommentDto) {
    return this.CommentService.updateComment(id, updatedComment);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Delete('delete/:id')
  deleteComment(@Param('id') id: number) {
    return this.CommentService.deleteComment(id);
  }
}
