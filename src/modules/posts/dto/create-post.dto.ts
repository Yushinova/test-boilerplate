import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({ 
        example: 'Мой первый пост', 
        description: 'Заголовок поста',
        minLength: 3,
        maxLength: 200
    })
    @IsString({ message: 'Заголовок должен быть строкой' })
    @IsNotEmpty({ message: 'Заголовок не может быть пустым' })
    @MinLength(3, { message: 'Заголовок должен содержать минимум 3 символа' })
    @MaxLength(200, { message: 'Заголовок не должен превышать 200 символов' })
    title!: string;

    @ApiProperty({ 
        example: 'Текст поста...', 
        description: 'Содержание поста',
        minLength: 10
    })
    @IsString({ message: 'Текст должен быть строкой' })
    @IsNotEmpty({ message: 'Текст не может быть пустым' })
    @MinLength(10, { message: 'Текст должен содержать минимум 10 символов' })
    text!: string;
}