import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { Comment } from './comments.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment]),  //РЕГИСТРИРУЕМ сущность
    ],
    controllers: [CommentsController],
    providers: [
        CommentsService,      //не был добавлен сервис
        CommentsRepository,   //не был добавлен репозиторий
    ],
})
export class CommentsModule {}
