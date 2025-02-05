import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository : Repository<User>){}

    createUser(createUserDto : CreateUserDto){
        // this is done after validation 
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    readUser(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }

    updateUser(id: number, updatedUser : UpdateUserDto){
        return this.userRepository.update(id,updatedUser)
    }

    deleteUser(user_id : number){
        return this.userRepository.delete(user_id)
    }
    
    // public + users private
    getPublicFeed(){

    }

    // users (public + private)
    getPrivateFeed(){
        
    }
}
