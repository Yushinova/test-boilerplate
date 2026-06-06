import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsNumber, IsOptional, Min, Max, ValidateIf, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @ApiProperty({ 
        example: 5, 
        description: 'Оценка от 1 до 5',
        required: false,
        minimum: 1,
        maximum: 5
    })
    @IsNumber({}, { message: 'Рейтинг должен быть числом' })
    @IsOptional()
    @Min(1, { message: 'Минимальная оценка - 1' })
    @Max(5, { message: 'Максимальная оценка - 5' })
    rating?: number;

    @ApiProperty({ 
        example: 'Обновлённый текст комментария', 
        description: 'Текст комментария',
        required: false
    })
    @IsString({ message: 'Текст должен быть строкой' })
    @IsOptional()
    @ValidateIf((o) => o.rating && o.rating >= 2 && o.rating <= 4)
    @MinLength(10, { message: 'При оценке от 2 до 4 текст должен содержать минимум 10 символов' })
    text?: string;
}