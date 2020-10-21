import { IsEnum, IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';
export class CreatePhotoDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    filename:string;

}