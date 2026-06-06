import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { Post } from './posts.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),  //РЕГИСТРИРУЕМ сущность
    ],
    controllers: [PostsController],
    providers: [PostsService, PostsRepository],
    exports: [PostsService],  // Если нужно использовать в других модулях
})
export class PostsModule {}