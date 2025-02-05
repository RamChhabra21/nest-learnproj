import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('Inside can activate of jwt auth guard')
        return super.canActivate(context);
    }    
}