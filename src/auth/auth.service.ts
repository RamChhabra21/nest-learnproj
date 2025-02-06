import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';
import { GlobalService } from 'src/utils/global.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService : JwtService, @InjectRepository(User) private readonly userRepository : Repository<User>){}
    // destructure username and password from auth payload 
    async validateuser({username, password} : AuthPayloadDto){
        // here send request to database to validate these credentials 
        const findUser = await this.userRepository.findOneBy({username})
        if(!findUser){
            return null;
        }
        if(findUser.password === password){
            // right credentials
            const {password , ...user} = findUser
            GlobalService.user_id = user.id
            return this.jwtService.sign(user);
        }
    }
}
