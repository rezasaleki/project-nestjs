import { IsEnum, IsNotEmpty, IsOptional, Matches, MinLength, IsString, maxLength, MaxLength } from 'class-validator';

export class AuthCredentialDto { //ValidationPipe use the Route

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(4)
    username:string

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(8)
    // @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    password:string


}