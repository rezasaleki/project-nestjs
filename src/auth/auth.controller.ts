import { Controller, Post, Body, ValidationPipe, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from 'src/Entity/user.entity';
import { getUser } from './get-user-decorator';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Get('/test')
    @UseGuards(AuthGuard())
    async test(@getUser() user: User) {

    }

    @Post('signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto){
        return this.authService.signUp(authCredentialDto);
    }

    @Post('signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDto);
    }

}
