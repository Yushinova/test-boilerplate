import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
    @Prop({ required: true })
    public postId!: number;

    @Prop({ required: true })
    public text?: string;

    @Prop({ required: true, default: 0 })  // рейтинг с дефолтом
    public rating!: number;

    @Prop({ required: true })
    public author!: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);