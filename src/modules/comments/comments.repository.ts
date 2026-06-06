import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comments.model';

@Injectable()
export class CommentsRepository {
    constructor(
        @InjectModel(Comment.name)
        private readonly commentModel: Model<CommentDocument>,
    ) {}

    // CREATE - создать комментарий
    async create(data: Partial<Comment>): Promise<CommentDocument> {
        const comment = new this.commentModel(data);
        return comment.save();
    }

    // READ - получить все комментарии
    async findAll(): Promise<CommentDocument[]> {
        return this.commentModel.find().exec();
    }

    // READ - получить комментарии по ID поста
    async findAllByPostId(postId: number): Promise<CommentDocument[]> {
        return this.commentModel.find({ postId }).exec();
    }

    // READ - получить один комментарий по ID
    async findById(id: string): Promise<CommentDocument | null> {
        return this.commentModel.findById(id).exec();
    }

    // UPDATE - обновить комментарий
    async update(id: string, data: Partial<Comment>): Promise<CommentDocument | null> {
        return this.commentModel
            .findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .exec();
    }

    // DELETE - удалить комментарий
    async delete(id: string): Promise<void> {
        await this.commentModel.findByIdAndDelete(id).exec();
    }
}