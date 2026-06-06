import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsNumber, IsOptional, Min, Max, ValidateIf, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @ApiProperty({ example: 5, description: 'Оценка от 1 до 5', required: false })
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(5)
    rating?: number;

    @ApiProperty({ example: 'Обновлённый текст', description: 'Текст комментария', required: false })
    @IsString()
    @IsOptional()
    @ValidateIf((o) => o.rating && o.rating >= 2 && o.rating <= 4)  // ← только если оценка 2-4
    @MinLength(10, { message: 'При оценке от 2 до 4 текст должен содержать минимум 10 символов' })
    text?: string;
}