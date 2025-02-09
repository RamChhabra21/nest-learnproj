import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { GlobalService } from "src/utils/global.service";

@Injectable()
export class AuthorizationGuard implements CanActivate{
    constructor(private readonly reflector : Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        // console.log(" inside access authorization guard ")
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY,[context.getClass(),context.getHandler()]);
        // console.log('the required roles are : ', requiredRoles)
        const userRole = req.user.role;
        var isallowed = false
        requiredRoles.map((role) => { if (role===userRole || (role=='self' && GlobalService.user_id == req.user.id)) { isallowed=true } } )
        return isallowed
    }
}