import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { Comment, CommentSchema } from './comments.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),  // ← ЭТО ВАЖНО!
    ],
    controllers: [CommentsController],
    providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}