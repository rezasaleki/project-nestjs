import { Repository, EntityRepository } from "typeorm";
import { User } from "../../src/Entity/user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredentialDto: AuthCredentialDto): Promise<User> {
        const { username, password } = authCredentialDto;
        const user    = new User();
        user.username = username;
        user.salt     = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt );

        // console.log(user.password);
        try {
            await user.save();
            return user;
        }catch(error) {
            if (error.code == 23505){
                throw new ConflictException('The Username Duplicate !');
            }else {
                throw new InternalServerErrorException();
            }
        }

    }

    async validateUserPassword(authCredentialDto : AuthCredentialDto):Promise<any> {

        const { username, password } = authCredentialDto;
        const user = await this.findOne({ where: { username } });
        if (user && (this.passwordsAreEqual(user.password, password))) {
            const { password, ...result } = user;
            return result;
        }else {
            return null;
        }

    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    private passwordsAreEqual(
        hashedPassword: string,
        plainPassword: string
    ){
        return bcrypt.compare(plainPassword, hashedPassword);
    }

}