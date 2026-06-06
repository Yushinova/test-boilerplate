import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, Min, Max, ValidateIf, MinLength } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty({ example: 1, description: 'ID поста' })
    @IsNumber()
    @Min(1)
    postId!: number;

    @ApiProperty({ 
        example: 'Отличный пост!', 
        description: 'Текст комментария (обязателен при оценке 2-4)',
        required: false,
        minLength: 10
    })
    @IsString()
    @IsOptional()
    @ValidateIf((o) => o.rating >= 2 && o.rating <= 4)  // ← только если оценка 2-4
    @MinLength(10, { message: 'При оценке от 2 до 4 текст должен содержать минимум 10 символов' })
    text?: string;

    @ApiProperty({ example: 5, description: 'Оценка от 1 до 5', minimum: 1, maximum: 5 })
    @IsNumber()
    @Min(1)
    @Max(5)
    rating!: number;

    @ApiProperty({ example: 'Анна', description: 'Автор комментария' })
    @IsString()
    @MinLength(2)
    author!: string;
}