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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthorizationGuard } from 'src/auth/guards/access.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { currentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from 'src/typeorm/User';
import { GlobalService } from 'src/utils/global.service';
import { env } from 'process';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // returns list of (all public) + (your private) blogs
  @Get('/feed')
  @UseGuards(JWTAuthGuard)
  publicfeed() {
    if(!GlobalService.user_id) return new UnauthorizedException();
    return this.userService.getPublicFeed();
  }

  // returns list of user's private and public blogs
  @Get('feed/my')
  @UseGuards(JWTAuthGuard)
  myblogs(@Param('id') id: string) {
    if (!GlobalService.user_id) return new UnauthorizedException();
    return this.userService.getPrivateFeed();
  }

  // registeration is equivalent to user creation
  @Post('create')
  @UsePipes(ValidationPipe)
  createuser(@Body() createUserDto: CreateUserDto) {
    console.log('User Creation Data Object Received : ', createUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get(':id')
  getuser(@Param('id') id: number) {
    return this.userService.readUser(id);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Patch('update/:id')
  updateuser(@Param('id') id: number, @Body() updatedUser: UpdateUserDto) {
    return this.userService.updateUser(id, updatedUser);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    console.log('reached delete method');
    return this.userService.deleteUser(id);
  }
}
