import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from 'rxjs';
import { AuthService } from "src/auth/auth.service";



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService){}
    canActivate(
        context:ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean>
    {
        const request = context.switchToHttp().getRequest();
        // return validateRequest(request);
        // return this.authService.login(request);
        return true;
    }
}