import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'test-boilerplate',
            autoLoadEntities: true,
            synchronize: true,
            logging: true,
        }),
        MongooseModule.forRoot('mongodb://localhost:27017/test-boilerplate'),
        PostsModule,
        CommentsModule,
    ],
})
export class AppModule {}
