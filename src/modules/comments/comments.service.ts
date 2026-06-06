import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDocument } from './comments.model';

@Injectable()
export class CommentsService {
    constructor(private readonly commentsRepository: CommentsRepository) {}

    // Приватный метод для дополнительной валидации
    private validateCommentRating(rating: number, text?: string): void {
        if (rating >= 2 && rating <= 4) {
            if (!text || text.trim().length < 10) {
                throw new BadRequestException(
                    'При оценке от 2 до 4 комментарий должен содержать текст не менее 10 символов'
                );
            }
        }
    }

    public async create(createCommentDto: CreateCommentDto): Promise<CommentDocument> {
        // Дополнительная валидация
        this.validateCommentRating(createCommentDto.rating, createCommentDto.text);
        return this.commentsRepository.create(createCommentDto);
    }

    public async findAll(): Promise<CommentDocument[]> {
        return this.commentsRepository.findAll();
    }

    public async findAllByPostId(postId: number): Promise<CommentDocument[]> {
        return this.commentsRepository.findAllByPostId(postId);
    }

    public async findOne(id: string): Promise<CommentDocument> {
        const comment = await this.commentsRepository.findById(id);
        if (!comment) {
            throw new NotFoundException(`Комментарий с ID ${id} не найден`);
        }
        return comment;
    }

    public async update(id: string, updateCommentDto: UpdateCommentDto): Promise<CommentDocument> {
        await this.findOne(id);
        
        // Если обновляется рейтинг, проверяем валидацию
        if (updateCommentDto.rating !== undefined) {
            this.validateCommentRating(updateCommentDto.rating, updateCommentDto.text);
        }
        
        const updatedComment = await this.commentsRepository.update(id, updateCommentDto);
        if (!updatedComment) {
            throw new NotFoundException(`Комментарий с ID ${id} не найден`);
        }
        return updatedComment;
    }

    public async remove(id: string): Promise<void> {
        await this.findOne(id);
        await this.commentsRepository.delete(id);
    }
}