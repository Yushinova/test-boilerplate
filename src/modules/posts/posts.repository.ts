import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './posts.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsRepository {
    constructor(
        @InjectRepository(Post)
        private readonly postModel: Repository<Post>
    ) {}

    // CREATE - создать пост
    async create(data: Partial<Post>): Promise<Post> {
        const post = this.postModel.create(data);
        return this.postModel.save(post);
    }

    // READ - получить все посты
    async findAll(): Promise<Post[]> {
        return this.postModel.find();
    }

    // READ - получить один пост по ID
    async findById(id: number): Promise<Post | null> {
        return this.postModel.findOne({ where: { id } });
    }

    // UPDATE - обновить пост
    async update(id: number, data: Partial<Post>): Promise<Post | null> {
        await this.postModel.update(id, data);
        return this.findById(id);
    }

    // DELETE - удалить пост
    async delete(id: number): Promise<void> {
        await this.postModel.delete(id);
    }
}