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
import { GlobalService } from 'src/utils/global.serivice';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Roles(['admin'])
  // @UseGuards(JWTAuthGuard, AuthorizationGuard)
  // @Get('')
  // findall(@Query('name') name?: string) {
  //   // implement the logic to return all users
  //   // return this.userService.findallusers(name);
  //   return {};
  // }

  // registeration is equivalent to user creation
  @Post('create')
  @UsePipes(ValidationPipe)
  createuser(@Body() createUserDto: CreateUserDto) {
    console.log('User Creation Data Object Received : ', createUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Roles(['admin'])
  @UseGuards(JWTAuthGuard, AuthorizationGuard)
  @Get('get/:id')
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

  // returns list of a random (fixed size) set of (all public) + (your private) blogs
  @Get('feed')
  publicfeed() {
    if(!GlobalService.user_id) return new UnauthorizedException();

  }

  // returns list of user's private and public blogs
  @Get('feed/my')
  myblogs(@Param('id') id: string) {
    if(!GlobalService.user_id) return new UnauthorizedException();
    
  }
}
