import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDocument } from './comments.model';

@Injectable()
export class CommentsService {
    constructor(private readonly commentsRepository: CommentsRepository) {}

    public async create(createCommentDto: CreateCommentDto): Promise<CommentDocument> {
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