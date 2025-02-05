import { Controller, Post, Body, HttpException, UnauthorizedException, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JWTAuthGuard } from './guards/jwt.guard';
import { Roles } from './decorators/roles.decorator';
import { AuthorizationGuard } from './guards/access.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}
    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req : Request){
        return req.user
    }

    // @Roles(['admin'])
    @Get('status')
    @UseGuards(JWTAuthGuard)
    status(@Req() req : Request){
        return req.user
    }
}
