import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { Post } from './modules/posts/posts.model';
import { validationSchema } from './config/validation';
import configuration from './config/configuration';

@Module({
    imports: [
        //используем ConfigModule загружает переменные из .env
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [configuration],
            validationSchema,
        }),

        //PostgreSQL - использует переменные из ConfigService
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get<number>('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                entities: [Post],
                synchronize: true,
                logging: true,
            }),
            inject: [ConfigService],
        }),

        //MongoDB - использует переменные из ConfigService
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('MONGO_URI'),
            }),
            inject: [ConfigService],
        }),

        PostsModule,
        CommentsModule,
    ],
})
export class AppModule {}