import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { Blog } from 'src/typeorm/Blog';
import { authorize } from 'passport';
import { GlobalService } from 'src/utils/global.service';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository : Repository<User>,
    @InjectRepository(Blog) private readonly blogRepository : Repository<Blog>){}
    createUser(createUserDto : CreateUserDto){
        // this is done after validation 
        const newUser : User = this.userRepository.create(createUserDto);
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
        const is_public = true;
        const conditions = {
            ...(is_public ? {is_public} : {})
        };

        return this.blogRepository.find({
            where : conditions   
        })        
    }

    // users (public + private)
    getPrivateFeed(){
        const author_id = GlobalService.user_id 
        const conditions = {
            ...(author_id ? {author_id} : {})
        };

        return this.blogRepository.find({
            where : conditions   
        })
    }
}
