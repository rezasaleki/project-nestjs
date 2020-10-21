import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from 'src/Entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository : UserRepository ,
        private readonly jwtService: JwtService
    ){}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<User> {
        return this.userRepository.signUp(authCredentialDto);
    }

    async signIn(authCerdentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {

        const user = await this.userRepository.validateUserPassword(authCerdentialDto);

        if (!user) {
            throw new UnauthorizedException('Invalid credential !');
        }

        const username = user.username;

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return {
            accessToken,
        };
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
