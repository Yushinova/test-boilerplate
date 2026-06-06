import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './posts.model';  //импортируем сущность

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),  //РЕГИСТРИРУЕМ сущность
    ],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}