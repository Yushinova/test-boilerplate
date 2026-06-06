import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, Min, Max, ValidateIf, MinLength, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty({ 
        example: 1, 
        description: 'ID поста, к которому относится комментарий',
        minimum: 1
    })
    @IsNumber({}, { message: 'postId должен быть числом' })
    @IsNotEmpty({ message: 'postId обязателен' })
    @Min(1, { message: 'postId должен быть больше 0' })
    postId: number;

    @ApiProperty({ 
        example: 'Отличный пост!', 
        description: 'Текст комментария (обязателен при оценке 2-4)',
        required: false,
        minLength: 10
    })
    @IsString({ message: 'Текст должен быть строкой' })
    @IsOptional()
    @ValidateIf((o) => o.rating >= 2 && o.rating <= 4)
    @MinLength(10, { message: 'При оценке от 2 до 4 текст должен содержать минимум 10 символов' })
    text?: string;

    @ApiProperty({ 
        example: 5, 
        description: 'Оценка от 1 до 5',
        minimum: 1,
        maximum: 5
    })
    @IsNumber({}, { message: 'Рейтинг должен быть числом' })
    @IsNotEmpty({ message: 'Рейтинг обязателен' })
    @Min(1, { message: 'Минимальная оценка - 1' })
    @Max(5, { message: 'Максимальная оценка - 5' })
    rating: number;

    @ApiProperty({ 
        example: 'Анна', 
        description: 'Автор комментария',
        minLength: 2
    })
    @IsString({ message: 'Имя автора должно быть строкой' })
    @IsNotEmpty({ message: 'Имя автора обязательно' })
    @MinLength(2, { message: 'Имя автора должно содержать минимум 2 символа' })
    author: string;
}