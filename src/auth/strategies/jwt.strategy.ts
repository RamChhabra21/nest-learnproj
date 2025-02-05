import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { GlobalService } from "src/utils/global.serivice";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    // here we need to pass arguments in our super class constructor (this is jwt strategy for auth, other was local strategy for auth)
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : '123'
        })
    }

    validate(payload){
        // addtional checks can be applied
        console.log("Inside the jwt strategy")
        console.log("payload : ", payload)
        GlobalService.user_id = payload.id;
        return payload
    }
}