import { Inject, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';

@Module({
    imports:[
        TypeOrmModule.forFeature([User])
    ],
    controllers:[UsersController],
    providers:[UsersService],
})
export class UsersModule {}
