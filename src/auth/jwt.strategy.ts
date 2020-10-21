import { PassportStrategy } from '@nestjs/passport';
import {Strategy , ExtractJwt} from 'passport-jwt';
import { JwtPayload } from './jwt-payload';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { User } from 'src/Entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret12356789'
        });
    }
    validate(payload : JwtPayload): Promise<User>{

        const { username } = payload;
        const user = this.userRepository.findOne({username});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
