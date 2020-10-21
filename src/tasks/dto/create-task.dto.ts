import { IsEnum, IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @ApiProperty()
    description:string;
}